'use client'

// React Imports
import { useState, useEffect } from 'react'

// MUI Imports
import Card from '@mui/material/Card'
import CardHeader from '@mui/material/CardHeader'
import CardContent from '@mui/material/CardContent'
import FormControl from '@mui/material/FormControl'
import InputLabel from '@mui/material/InputLabel'
import Select from '@mui/material/Select'
import TextField from '@mui/material/TextField'
import Chip from '@mui/material/Chip'
import Autocomplete from '@mui/material/Autocomplete'

// Component Imports
// import CustomIconButton from '@core/components/mui/IconButton'

interface SelectedValues {
  vendors?: { id: string; name: string }[]
  stores?: { id: string; name: string }[]
  categories?: { id: string; name: string }[]
  collections?: { id: string; name: string }[]
  tags?: string[]
}

const demoVendors = [
  { id: '1', name: "Men's Clothing" },
  { id: '2', name: "Women's Clothing" },
  { id: '3', name: "Kid's Clothing" },
]

const demoStores = [
  { id: '1', name: 'Store 1' },
  { id: '2', name: 'Store 2' },
  { id: '3', name: 'Store 3' },
]

const demoCategories = [
  { id: '1', name: 'Household' },
  { id: '2', name: 'Office' },
  { id: '3', name: 'Electronics' },
  { id: '4', name: 'Management' },
  { id: '5', name: 'Automotive' },
]

const demoCollections = [
  { id: '1', name: "Men's Clothing" },
  { id: '2', name: "Women's Clothing" },
  { id: '3', name: "Kid's Clothing" },
]

const defaultSelectedValues: SelectedValues = {
  vendors: [demoVendors[0]], // Default selected vendor
  stores: [demoStores[1]], // Default selected store
  categories: [demoCategories[2]], // Default selected category
  collections: [demoCollections[0]], // Default selected collection
  tags: ['Fashion', 'Trending'], // Default tags
}

const ProductOrganize = ({ selectedValues = defaultSelectedValues }: { selectedValues?: SelectedValues }) => {
  const [vendor, setVendor] = useState<{ id: string; name: string }[]>([])
  const [store, setStore] = useState<{ id: string; name: string }[]>([])
  const [category, setCategory] = useState<{ id: string; name: string }[]>([])
  const [collection, setCollection] = useState<{ id: string; name: string }[]>([])
  const [tags, setTags] = useState<string[]>([])
  const [tagInput, setTagInput] = useState<string>('') // State for the tag input

  useEffect(() => {
    // Initialize with demo data or props
    setVendor(selectedValues.vendors || [])
    setStore(selectedValues.stores || [])
    setCategory(selectedValues.categories || [])
    setCollection(selectedValues.collections || [])
    setTags(selectedValues.tags || [])
  }, [selectedValues])

  const handleTagDelete = (tagToDelete: string) => {
    setTags((tags) => tags.filter((tag) => tag !== tagToDelete))
  }

  const handleTagKeyDown = (event: React.KeyboardEvent<HTMLInputElement>) => {
    if (event.key === 'Enter' && tagInput.trim()) {
      if (!tags.includes(tagInput.trim())) {
        setTags((tags) => [...tags, tagInput.trim()])
      }

      setTagInput('') // Clear the input after adding the tag
      event.preventDefault() // Prevent form submission
    }
  }

  return (
    <Card>
      <CardHeader title='Organize' />
      <CardContent>
        <form onSubmit={e => e.preventDefault()} className='flex flex-col gap-5'>
          <FormControl fullWidth>
            {/* <InputLabel>Select Vendor</InputLabel> */}
            <Autocomplete
              multiple
              options={demoVendors}
              getOptionLabel={(option) => option.name}
              value={vendor}
              onChange={(event, newValue) => setVendor(newValue)}
              renderInput={(params) => <TextField {...params} label='Select Vendor' />}
              renderTags={(value, getTagProps) =>
                value.map((option, index) => (
                  <Chip variant='outlined' label={option.name} {...getTagProps({ index })} />
                ))
              }
            />
          </FormControl>
          <FormControl fullWidth>
            {/* <InputLabel>Select Store</InputLabel> */}
            <Autocomplete
              multiple
              options={demoStores}
              getOptionLabel={(option) => option.name}
              value={store}
              onChange={(event, newValue) => setStore(newValue)}
              renderInput={(params) => <TextField {...params} label='Select Store' />}
              renderTags={(value, getTagProps) =>
                value.map((option, index) => (
                  <Chip variant='outlined' label={option.name} {...getTagProps({ index })} />
                ))
              }
            />
          </FormControl>
          <FormControl fullWidth>
            {/* <InputLabel>Select Category</InputLabel> */}
            <Autocomplete
              multiple
              options={demoCategories}
              getOptionLabel={(option) => option.name}
              value={category}
              onChange={(event, newValue) => setCategory(newValue)}
              renderInput={(params) => <TextField {...params} label='Select Category' />}
              renderTags={(value, getTagProps) =>
                value.map((option, index) => (
                  <Chip variant='outlined' label={option.name} {...getTagProps({ index })} />
                ))
              }
            />
          </FormControl>
          <FormControl fullWidth>
            {/* <InputLabel>Select Collection</InputLabel> */}
            <Autocomplete
              multiple
              options={demoCollections}
              getOptionLabel={(option) => option.name}
              value={collection}
              onChange={(event, newValue) => setCollection(newValue)}
              renderInput={(params) => <TextField {...params} label='Select Collection' />}
              renderTags={(value, getTagProps) =>
                value.map((option, index) => (
                  <Chip variant='outlined' label={option.name} {...getTagProps({ index })} />
                ))
              }
            />
          </FormControl>
          <TextField
            fullWidth
            label='Enter Tags'
            placeholder='Fashion, Trending, Summer'
            value={tagInput}
            onChange={(e) => setTagInput(e.target.value)} // Update tag input state
            onKeyDown={handleTagKeyDown}
            InputProps={{
              startAdornment: (
                <div style={{ display: 'flex', flexWrap: 'wrap' }}>
                  {tags.map((tag) => (
                    <Chip
                      key={tag}
                      label={tag}
                      onDelete={() => handleTagDelete(tag)}
                      style={{ margin: '2px' }}
                    />
                  ))}
                </div>
              ),
            }}
          />
        </form>
      </CardContent>
    </Card>
  )
}

export default ProductOrganize
