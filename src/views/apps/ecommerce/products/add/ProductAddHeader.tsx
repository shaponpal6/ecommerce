"use client"

// MUI Imports
import { useCallback } from 'react'

import { useDispatch, useSelector } from 'react-redux'
import Button from '@mui/material/Button'
import Typography from '@mui/material/Typography'
import FormControl from '@mui/material/FormControl'
import InputLabel from '@mui/material/InputLabel'
import Select from '@mui/material/Select'
import MenuItem from '@mui/material/MenuItem'

// Store Imports
import type { AppDispatch, RootState } from '@/redux-store'
import { setBasicInfo, resetForm, setLanguage } from '@/redux-store/slices/product'

const ProductAddHeader = () => {
  const dispatch = useDispatch<AppDispatch>()
  const productState = useSelector((state: RootState) => state.productReducer)

  const handleDiscard = useCallback(() => {
    if (confirm('Are you sure you want to discard changes?')) {
      dispatch(resetForm())
    }
  }, [dispatch])

  const handleSaveDraft = useCallback(() => {
    // dispatch(setBasicInfo({ ...productState, status: 'DRAFT' }))
    console.log('Draft Product Data:', productState)
  }, [dispatch, productState])

  const handlePublish = useCallback(() => {
    // dispatch(setBasicInfo({ ...productState, status: 'PUBLISHED' }))
    console.log('Published Product Data:', productState)
  }, [dispatch, productState])

  const handleLanguageChange = (event: React.ChangeEvent<{ value: unknown }>) => {
    const selectedLanguage = event.target.value as { id: number; langCode: string; langName: string };

    dispatch(setLanguage(selectedLanguage));
  }

  return (
    <div className='flex flex-wrap sm:items-center justify-between max-sm:flex-col gap-6'>
      <div>
        <Typography variant='h4' className='mbe-1'>
          Add a new product
        </Typography>
        <Typography>Orders placed across your store</Typography>
      </div>
      <div className='flex flex-wrap max-sm:flex-col gap-4'>
        <Button variant='outlined' color='secondary' onClick={handleDiscard}>
          Discard
        </Button>
        <Button variant='outlined' onClick={handleSaveDraft}>
          Save Draft
        </Button>
        <Button variant='contained' onClick={handlePublish}>
          Publish Product
        </Button>

        <FormControl variant="outlined" className="min-w-[120px]">
          <InputLabel id="language-select-label">Language</InputLabel>
          <Select
            labelId="language-select-label"
            onChange={handleLanguageChange}
            defaultValue={{ id: 1, langCode: 'en', langName: 'English' }} // Default language
          >
            <MenuItem value={{ id: 1, langCode: 'en', langName: 'English' }}>English</MenuItem>
            <MenuItem value={{ id: 2, langCode: 'fr', langName: 'French' }}>French</MenuItem>
          </Select>
        </FormControl>
      </div>
    </div>
  )
}

export default ProductAddHeader
