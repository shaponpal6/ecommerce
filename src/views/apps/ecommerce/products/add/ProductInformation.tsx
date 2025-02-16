'use client'

// MUI Imports
import { useParams } from 'next/navigation'

import Divider from '@mui/material/Divider'
import Grid from '@mui/material/Grid'
import Card from '@mui/material/Card'
import CardHeader from '@mui/material/CardHeader'
import CardContent from '@mui/material/CardContent'
import TextField from '@mui/material/TextField'
import Typography from '@mui/material/Typography'

// Third-party Imports
import classnames from 'classnames'
import { useEditor, EditorContent } from '@tiptap/react'
import { StarterKit } from '@tiptap/starter-kit'
import { Underline } from '@tiptap/extension-underline'
import { Placeholder } from '@tiptap/extension-placeholder'
import { TextAlign } from '@tiptap/extension-text-align'
import type { Editor } from '@tiptap/core'

// Components Imports
import CustomIconButton from '@core/components/mui/IconButton'

// Style Imports
import '@/libs/styles/tiptapEditor.css'

// Store Imports
import { useDispatch, useSelector } from 'react-redux'

import type { AppDispatch, RootState } from '@/redux-store'
import { addTranslation, setBasicInfo, setLanguage } from '@/redux-store/slices/product'

interface ProductInformationProps {
  initialProductName?: string
  initialSKU?: string
  initialBarcode?: string
  initialDescription?: string
}

const EditorToolbar = ({ editor }: { editor: Editor | null }) => {
  if (!editor) {
    return null
  }

  return (
    <div className='flex flex-wrap gap-x-3 gap-y-1 pbs-5 pbe-4 pli-5'>
      <CustomIconButton
        {...(editor.isActive('bold') && { color: 'primary' })}
        variant='outlined'
        size='small'
        onClick={() => editor.chain().focus().toggleBold().run()}
      >
        <i className={classnames('ri-bold', { 'text-textSecondary': !editor.isActive('bold') })} />
      </CustomIconButton>
      <CustomIconButton
        {...(editor.isActive('underline') && { color: 'primary' })}
        variant='outlined'
        size='small'
        onClick={() => editor.chain().focus().toggleUnderline().run()}
      >
        <i className={classnames('ri-underline', { 'text-textSecondary': !editor.isActive('underline') })} />
      </CustomIconButton>
      <CustomIconButton
        {...(editor.isActive('italic') && { color: 'primary' })}
        variant='outlined'
        size='small'
        onClick={() => editor.chain().focus().toggleItalic().run()}
      >
        <i className={classnames('ri-italic', { 'text-textSecondary': !editor.isActive('italic') })} />
      </CustomIconButton>
      <CustomIconButton
        {...(editor.isActive('strike') && { color: 'primary' })}
        variant='outlined'
        size='small'
        onClick={() => editor.chain().focus().toggleStrike().run()}
      >
        <i className={classnames('ri-strikethrough', { 'text-textSecondary': !editor.isActive('strike') })} />
      </CustomIconButton>
    </div>
  )
}

const ProductInformation = ({
  initialProductName = 'iPhone 14',
  initialSKU = 'FXSK123U',
  initialBarcode = '0123-4567',
  initialDescription = ''
}: ProductInformationProps) => {
  const { lang } = useParams()
  const dispatch = useDispatch<AppDispatch>()
  const { translations, sku, barcode, currentProduct, language } = useSelector((state: RootState) => state.productReducer)
  const languageId = language.id;

  const editor = useEditor({
    extensions: [
      StarterKit,
      Placeholder.configure({
        placeholder: 'Write something here...'
      }),
      TextAlign.configure({
        types: ['heading', 'paragraph']
      }),
      Underline
    ],
    content: initialDescription
  })

  // Update handlers to use Redux
  editor?.on('update', ({ editor }) => {
    handleContentChange('desc', editor.getHTML())
  })

  const handleProductChange = (field: string, value: string) => {
    dispatch(setBasicInfo({ [field]: value }))
  }

  const handleContentChange = (field: string, value: string) => {
    console.log('translations', translations)
    const updatedTranslation = { ...translations[languageId], [field]: value }

    console.log('final', { languageId, ...updatedTranslation })
    dispatch(addTranslation({ languageId, ...updatedTranslation }))
  }

  const handleChangeLanguage = (newLanguage: Language) => {
    dispatch(setLanguage(newLanguage));
  };

  return (
    <Card>
      <CardHeader title='Product Information' />
      <CardContent>
        <Grid container spacing={5} className='mbe-5'>
          <Grid item xs={12}>
            <TextField
              fullWidth
              label='Product Name'
              placeholder='iPhone 14'
              defaultValue={initialProductName}
              onChange={(e) => handleContentChange('name', e.target.value)}
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <TextField
              fullWidth
              label='SKU'
              placeholder='FXSK123U'
              defaultValue={initialSKU}
              onChange={(e) => handleProductChange('sku', e.target.value)}
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <TextField
              fullWidth
              label='Barcode'
              placeholder='0123-4567'
              defaultValue={initialBarcode}
              onChange={(e) => handleProductChange('barcode', e.target.value)}
            />
          </Grid>
        </Grid>
        <Typography className='mbe-1'>Description (Optional)</Typography>
        <Card className='p-0 border shadow-none'>
          <EditorContent
            editor={editor}
            className='bs-[135px] overflow-y-auto flex '
          />
        </Card>
      </CardContent>
    </Card>
  )
}

export default ProductInformation
