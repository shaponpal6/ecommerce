'use client'

// MUI Imports
import { useState } from 'react'

import Card from '@mui/material/Card'
import CardHeader from '@mui/material/CardHeader'
import CardContent from '@mui/material/CardContent'
import Checkbox from '@mui/material/Checkbox'
import Divider from '@mui/material/Divider'
import FormControlLabel from '@mui/material/FormControlLabel'
import Switch from '@mui/material/Switch'
import TextField from '@mui/material/TextField'
import Typography from '@mui/material/Typography'

// Component Imports
import { FormControl, InputLabel, MenuItem, Select } from '@mui/material'

import Form from '@components/Form'

interface ProductPricingProps {
  initialStatus?: string
  initialBasePrice?: string
  initialDiscountedPrice?: string
  initialComparePrice?: string
  initialCostPrice?: string
  initialQuantity?: string
  initialChargeTax?: boolean
  initialInStock?: boolean
}

const ProductPricing = ({
  initialStatus = 'Published',
  initialBasePrice = '',
  initialDiscountedPrice = '',
  initialComparePrice = '',
  initialCostPrice = '',
  initialQuantity = '',
  initialChargeTax = false,
  initialInStock = true
}: ProductPricingProps) => {
  const [status, setStatus] = useState(initialStatus)
  const [basePrice, setBasePrice] = useState(initialBasePrice)
  const [discountedPrice, setDiscountedPrice] = useState(initialDiscountedPrice)
  const [comparePrice, setComparePrice] = useState(initialComparePrice)
  const [costPrice, setCostPrice] = useState(initialCostPrice)
  const [quantity, setQuantity] = useState(initialQuantity)
  const [chargeTax, setChargeTax] = useState(initialChargeTax)
  const [inStock, setInStock] = useState(initialInStock)

  return (
    <Card>
      <CardHeader title='Pricing' />
      <CardContent>
        <Form>
          <FormControl fullWidth className='mbe-5'>
            <InputLabel>Select Status</InputLabel>
            <Select
              label='Select Status'
              value={status}
              onChange={(e) => setStatus(e.target.value)}
            >
              <MenuItem value='Published'>Published</MenuItem>
              <MenuItem value='Inactive'>Inactive</MenuItem>
              <MenuItem value='Scheduled'>Draft</MenuItem>
            </Select>
          </FormControl>
          <TextField
            fullWidth
            label='Base Price'
            placeholder='Enter Base Price'
            value={basePrice}
            onChange={(e) => setBasePrice(e.target.value)}
            className='mbe-5'
          />
          <TextField
            fullWidth
            label='Discounted Price'
            value={discountedPrice}
            onChange={(e) => setDiscountedPrice(e.target.value)}
            className='mbe-5'
          />
          <TextField
            fullWidth
            label='Compare Price'
            value={comparePrice}
            onChange={(e) => setComparePrice(e.target.value)}
            className='mbe-5'
          />
          <TextField
            fullWidth
            label='Cost Price'
            value={costPrice}
            onChange={(e) => setCostPrice(e.target.value)}
            className='mbe-5'
          />
          <TextField
            fullWidth
            label='Quantity'
            value={quantity}
            onChange={(e) => setQuantity(e.target.value)}
            className='mbe-5'
          />
          <FormControlLabel
            control={
              <Checkbox
                checked={chargeTax}
                onChange={(e) => setChargeTax(e.target.checked)}
              />
            }
            label='Charge tax on this product'
          />
          <Divider className='mlb-2' />
          <div className='flex items-center justify-between'>
            <Typography>In stock</Typography>
            <Switch
              checked={inStock}
              onChange={(e) => setInStock(e.target.checked)}
            />
          </div>
        </Form>
      </CardContent>
    </Card>
  )
}

export default ProductPricing
