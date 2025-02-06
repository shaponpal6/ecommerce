'use client'

import { useState, useEffect } from 'react'

import Card from '@mui/material/Card'
import CardHeader from '@mui/material/CardHeader'
import CardContent from '@mui/material/CardContent'
import Button from '@mui/material/Button'
import FormControl from '@mui/material/FormControl'
import InputLabel from '@mui/material/InputLabel'
import MenuItem from '@mui/material/MenuItem'
import Select from '@mui/material/Select'
import TextField from '@mui/material/TextField'
import Grid from '@mui/material/Grid'
import Tab from '@mui/material/Tab'
import TabContext from '@mui/lab/TabContext'
import TabPanel from '@mui/lab/TabPanel'
import Typography from '@mui/material/Typography'
import IconButton from '@mui/material/IconButton'
import Table from '@mui/material/Table'
import TableBody from '@mui/material/TableBody'
import TableCell from '@mui/material/TableCell'
import TableContainer from '@mui/material/TableContainer'
import TableHead from '@mui/material/TableHead'
import TableRow from '@mui/material/TableRow'
import Paper from '@mui/material/Paper'

import CustomTabList from '@core/components/mui/TabList'

interface Attribute {
  id: string
  type: string
  value: string
}

interface Variation {
  id: string
  attributes: { [key: string]: string }
  price: string
  discountPrice: string
  comparePrice: string
  cost: string
  quantity: string
  weight: string
  sku: string
}

const demoAttributes = [
  { id: '1', type: 'Color', values: ['Red', 'Blue', 'Green', 'Black'] },
  { id: '2', type: 'Size', values: ['S', 'M', 'L', 'XL'] },
  { id: '3', type: 'Material', values: ['Cotton', 'Polyester', 'Wool'] }
]

const demoVariations: Variation[] = [
  {
    id: '1',
    attributes: { Color: 'Red', Size: 'M' },
    price: '29.99',
    discountPrice: '24.99',
    comparePrice: '34.99',
    cost: '15.00',
    quantity: '100',
    weight: '0.5',
    sku: 'RED-M-001'
  },
]

const productData: Variation = {
  price: '29.99',
  discountPrice: '24.99',
  comparePrice: '34.99',
  cost: '15.00',
  quantity: '100',
  weight: '0.5',
  sku: 'RED-M-001'
}

const ProductVariants = () => {
  const [activeTab, setActiveTab] = useState('variations')
  const [attributes, setAttributes] = useState<Attribute[]>([])
  const [variations, setVariations] = useState<Variation[]>([])
  const [showDemo, setShowDemo] = useState(false)

  const handleAddAttribute = () => {
    setAttributes([...attributes, { id: Date.now().toString(), type: '', value: '' }])
  }

  const handleAttributeChange = (id: string, field: 'type' | 'value', value: string) => {
    setAttributes(attributes.map(attr =>
      attr.id === id ? { ...attr, [field]: value } : attr
    ))
  }

  const handleRemoveAttribute = (id: string) => {
    setAttributes(attributes.filter(attr => attr.id !== id))
  }

  const generateVariations = () => {
    const validAttributes = attributes.filter(attr => attr.type && attr.value)

    if (validAttributes.length === 0) return

    const combinations = generateCombinations(validAttributes)

    const newVariations = combinations.map((combo, index) => {
      const skuParts = Object.values(combo).map(value =>
        value.substring(0, 3).toUpperCase()
      )

      return {
        id: Date.now().toString() + index,
        attributes: combo,
        ...productData,
        sku: `${skuParts.join('-')}-${String(index + 1).padStart(3, '0')}`
      }
    })

    setVariations(newVariations)
    setActiveTab('variations')
  }

  const generateCombinations = (attrs: Attribute[]) => {
    const result: { [key: string]: string }[] = []
    const values = attrs.map(attr => attr.value.split(',').map(v => v.trim()))
    const types = attrs.map(attr => attr.type)

    const generateHelper = (current: string[], position: number) => {
      if (position === attrs.length) {
        const combo: { [key: string]: string } = {}

        types.forEach((type, index) => {
          combo[type] = current[index]
        })
        result.push(combo)

        return
      }

      for (const value of values[position]) {
        generateHelper([...current, value], position + 1)
      }
    }

    generateHelper([], 0)

    return result
  }

  const handleVariationChange = (id: string, field: string, value: string) => {
    setVariations(variations.map(variation =>
      variation.id === id ? { ...variation, [field]: value } : variation
    ))
  }

  const handleSaveVariations = () => {
    console.log('Saving variations:', variations)
  }

  const handleDeleteVariation = (id: string) => {
    setVariations(variations.filter(v => v.id !== id))
  }

  return (
    <Card>
      <TabContext value={activeTab}>
        <CardHeader
          title='Product Variants'
          action={
            <CustomTabList onChange={(_, value) => setActiveTab(value)}>
              <Tab value='attributes' label='Attributes' />
              <Tab value='variations' label='Variations' />
            </CustomTabList>
          }
        />
        <CardContent>
          <TabPanel value='attributes'>
            {attributes.map((attribute) => (
              <Grid container spacing={4} key={attribute.id} className='mbe-4'>
                <Grid xs={12} sm={4}>
                  <FormControl fullWidth>
                    <InputLabel>Attribute Type</InputLabel>
                    <Select
                      value={attribute.type}
                      label='Attribute Type'
                      onChange={(e) => handleAttributeChange(attribute.id, 'type', e.target.value)}
                    >
                      {demoAttributes.map(attr => (
                        <MenuItem key={attr.id} value={attr.type}>{attr.type}</MenuItem>
                      ))}
                    </Select>
                  </FormControl>
                </Grid>
                <Grid xs={12} sm={7}>
                  <TextField
                    fullWidth
                    label='Values (comma-separated)'
                    value={attribute.value}
                    onChange={(e) => handleAttributeChange(attribute.id, 'value', e.target.value)}
                  />
                </Grid>
                <Grid xs={12} sm={1}>
                  <IconButton onClick={() => handleRemoveAttribute(attribute.id)}>
                    <i className='ri-delete-bin-line' />
                  </IconButton>
                </Grid>
              </Grid>
            ))}

            <div className='flex justify-between mbs-4'>
              <Button
                variant='outlined'
                onClick={handleAddAttribute}
                startIcon={<i className='ri-add-line' />}
              >
                Add Attribute
              </Button>
              <Button
                variant='contained'
                onClick={generateVariations}
                startIcon={<i className='ri-magic-line' />}
                disabled={attributes.length === 0}
              >
                Generate Variations
              </Button>
            </div>
          </TabPanel>

          <TabPanel value='variations'>
            {variations.length === 0 ? (
              <div className='flex flex-col items-center justify-center min-block-size-[200px]'>
                <Button
                  variant='contained'
                  onClick={() => setVariations(demoVariations)}
                  startIcon={<i className='ri-eye-line' />}
                >
                  View Demo Variations
                </Button>
              </div>
            ) : (
              <>
                <TableContainer
                  component={Paper}
                  sx={{
                    maxHeight: 600,
                    minHeight: 200,
                    '& .MuiTable-root': {
                      minWidth: 1200
                    }
                  }}
                >
                  <Table stickyHeader>
                    <TableHead>
                      <TableRow>
                        <TableCell>Variant ({variations.length})</TableCell>
                        <TableCell>Price</TableCell>
                        <TableCell>Discount</TableCell>
                        <TableCell>Compare At</TableCell>
                        <TableCell>Cost</TableCell>
                        <TableCell>Quantity</TableCell>
                        <TableCell>Weight</TableCell>
                        <TableCell>SKU</TableCell>
                        <TableCell>Actions</TableCell>
                      </TableRow>
                    </TableHead>
                    <TableBody>
                      {variations.map((variation) => (
                        <TableRow key={variation.id}>
                          <TableCell>
                            {Object.entries(variation.attributes).map(([key, value]) =>
                              `${key}: ${value}`
                            ).join(', ')}
                          </TableCell>
                          {['price', 'discountPrice', 'comparePrice', 'cost', 'quantity', 'weight', 'sku'].map((field) => (
                            <TableCell key={field}>
                              <TextField
                                size='small'
                                value={variation[field]}
                                onChange={(e) => handleVariationChange(variation.id, field, e.target.value)}
                                disabled={field === 'sku'}
                              />
                            </TableCell>
                          ))}
                          <TableCell>
                            <IconButton onClick={() => handleDeleteVariation(variation.id)}>
                              <i className='ri-delete-bin-line' />
                            </IconButton>
                          </TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                </TableContainer>
                <div className='flex justify-end mbs-4'>
                  <Button
                    variant='contained'
                    onClick={handleSaveVariations}
                    startIcon={<i className='ri-save-line' />}
                  >
                    Confirm and Save
                  </Button>
                </div>
              </>
            )}
          </TabPanel>
        </CardContent>
      </TabContext>
    </Card>
  )
}

export default ProductVariants
