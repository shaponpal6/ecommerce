'use client'

import { useState, useEffect } from 'react'

import { useDispatch, useSelector } from 'react-redux'


import Card from '@mui/material/Card'
import CardHeader from '@mui/material/CardHeader'
import CardContent from '@mui/material/CardContent'
import Button from '@mui/material/Button'
import IconButton from '@mui/material/IconButton'
import List from '@mui/material/List'
import ListItem from '@mui/material/ListItem'
import Typography from '@mui/material/Typography'
import { styled } from '@mui/material/styles'
import type { BoxProps } from '@mui/material/Box'
import Tab from '@mui/material/Tab'
import TabContext from '@mui/lab/TabContext'
import TabPanel from '@mui/lab/TabPanel'
import Grid from '@mui/material/Grid'

import { useDropzone } from 'react-dropzone'

import { setMainImage, addGalleryImage, removeGalleryImage } from '@/redux-store/slices/product'
import type { AppDispatch, RootState } from '@/redux-store'

import CustomTabList from '@core/components/mui/TabList'
import Link from '@components/Link'
import CustomAvatar from '@core/components/mui/Avatar'
import AppReactDropzone from '@/libs/styles/AppReactDropzone'

interface ImageFile extends File {
  preview?: string
}

interface ProductImageProps {
  defaultImage?: string
  defaultGallery?: string[]
  onImageChange?: (mainImage: File | null, galleryImages: File[]) => void
}

// Styled Components
const Dropzone = styled(AppReactDropzone)<BoxProps>(({ theme }) => ({
  '& .dropzone': {
    minHeight: 'unset',
    padding: theme.spacing(6),
    border: `2px dashed ${theme.palette.divider}`,
    borderRadius: theme.shape.borderRadius,
    [theme.breakpoints.down('sm')]: {
      paddingInline: theme.spacing(4)
    }
  }
}))

const ImagePreview = styled('div')(({ theme }) => ({
  position: 'relative',
  width: '100%',
  height: 200,
  borderRadius: theme.shape.borderRadius,
  overflow: 'hidden',
  '& img': {
    width: '100%',
    height: '100%',
    objectFit: 'cover'
  }
}))

const ProductImage = ({ defaultImage, defaultGallery = [], onImageChange }: ProductImageProps) => {
  const dispatch = useDispatch<AppDispatch>()
  // const { mainImage, galleryImages } = useSelector((state: RootState) => state.product)
  const [activeTab, setActiveTab] = useState('main')
  const [mainImageState, setMainImageState] = useState<ImageFile | null>(null)
  const [galleryImagesState, setGalleryImagesState] = useState<ImageFile[]>([])

  useEffect(() => {
    // Initialize with default values if provided
    if (defaultImage) {
      fetch(defaultImage)
        .then(res => res.blob())
        .then(blob => {
          const file = new File([blob], 'main-image.jpg', { type: 'image/jpeg' })

          setMainImageState(Object.assign(file, { preview: defaultImage }))
        })
    }

    if (defaultGallery.length > 0) {
      Promise.all(
        defaultGallery.map(url =>
          fetch(url)
            .then(res => res.blob())
            .then(blob => {
              const file = new File([blob], `gallery-${Math.random()}.jpg`, { type: 'image/jpeg' })


              return Object.assign(file, { preview: url })
            })
        )
      ).then(files => setGalleryImagesState(files))
    }
  }, [defaultImage, defaultGallery])

  const mainDropzone = useDropzone({
    accept: { 'image/*': [] },
    maxFiles: 1,
    onDrop: acceptedFiles => {
      const file = Object.assign(acceptedFiles[0], {
        preview: URL.createObjectURL(acceptedFiles[0])
      })

      setMainImageState(file)
      onImageChange?.(file, galleryImagesState)
    }
  })

  const galleryDropzone = useDropzone({
    accept: { 'image/*': [] },
    onDrop: acceptedFiles => {
      const newFiles = acceptedFiles.map(file =>
        Object.assign(file, {
          preview: URL.createObjectURL(file)
        })
      )

      setGalleryImagesState(prev => [...prev, ...newFiles])
      onImageChange?.(mainImageState, [...galleryImagesState, ...newFiles])
    }
  })

  const handleRemoveMainImage = () => {
    setMainImageState(null)
    onImageChange?.(null, galleryImagesState)
  }

  const handleRemoveGalleryImage = (index: number) => {
    const newGallery = galleryImagesState.filter((_, i) => i !== index)

    setGalleryImagesState(newGallery)
    onImageChange?.(mainImageState, newGallery)
  }

  const handleMainImageChange = (file: File) => {
    dispatch(setMainImage({
      type: 'image',
      url: URL.createObjectURL(file),
      sortOrder: 0
    }))
  }

  return (
    <Card>
      <TabContext value={activeTab}>
        <CardHeader
          title='Product Images'
          action={
            <CustomTabList onChange={(_, value) => setActiveTab(value)}>
              <Tab value='main' label='Main Image' />
              <Tab value='gallery' label='Gallery' />
            </CustomTabList>
          }
        />
        <CardContent>
          <TabPanel value='main'>
            <Dropzone>
              <div {...mainDropzone.getRootProps({ className: 'dropzone' })}>
                <input {...mainDropzone.getInputProps()} />
                {mainImageState ? (
                  <ImagePreview>
                    <img src={mainImageState.preview} alt='Main product' />
                    <IconButton
                      onClick={handleRemoveMainImage}
                      sx={{ position: 'absolute', top: 8, right: 8, bgcolor: 'background.paper' }}
                    >
                      <i className='ri-close-line' />
                    </IconButton>
                  </ImagePreview>
                ) : (
                  <div className='flex items-center flex-col gap-2 text-center'>
                    <CustomAvatar variant='rounded' skin='light' color='primary'>
                      <i className='ri-upload-2-line' />
                    </CustomAvatar>
                    <Typography variant='h6'>Drop main product image here</Typography>
                    <Typography color='text.secondary'>or click to browse</Typography>
                  </div>
                )}
              </div>
            </Dropzone>
          </TabPanel>

          <TabPanel value='gallery'>
            <Dropzone>
              <div {...galleryDropzone.getRootProps({ className: 'dropzone' })}>
                <input {...galleryDropzone.getInputProps()} />
                <div className='flex items-center flex-col gap-2 text-center'>
                  <CustomAvatar variant='rounded' skin='light' color='primary'>
                    <i className='ri-upload-cloud-line' />
                  </CustomAvatar>
                  <Typography variant='h6'>Drop gallery images here</Typography>
                  <Typography color='text.secondary'>or click to browse</Typography>
                </div>
              </div>
            </Dropzone>

            {galleryImagesState.length > 0 && (
              <Grid container spacing={2} className='mbs-4'>
                {galleryImagesState.map((file, index) => (
                  <Grid key={index} xs={12} sm={6} md={4}>
                    <ImagePreview>
                      <img src={file.preview} alt={`Gallery ${index + 1}`} />
                      <IconButton
                        onClick={() => handleRemoveGalleryImage(index)}
                        sx={{ position: 'absolute', top: 8, right: 8, bgcolor: 'background.paper' }}
                      >
                        <i className='ri-close-line' />
                      </IconButton>
                    </ImagePreview>
                  </Grid>
                ))}
              </Grid>
            )}
          </TabPanel>
        </CardContent>
      </TabContext>
    </Card>
  )
}

export default ProductImage
