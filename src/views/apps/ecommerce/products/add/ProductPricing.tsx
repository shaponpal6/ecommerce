'use client'

// MUI Imports
import { useState, useEffect } from 'react'

import { useDispatch, useSelector } from 'react-redux'


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

import { addPrice, setCurrency, setBasicInfo } from '@/redux-store/slices/product'
import type { AppDispatch, RootState } from '@/redux-store'

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
  const dispatch = useDispatch<AppDispatch>()
  const { prices, chargeTax, inStock, currency, status } = useSelector((state: RootState) => state.productReducer)

  const handlePriceChange = (currencyId: string, field: string, value: string) => {
    dispatch(addPrice({
      currencyId,
      ...prices.find(p => p.currencyId === currencyId),
      [field]: value
    }))
  }

  const addBasicInfo = (field: string, value: string) => {
    dispatch(setBasicInfo({ [field]: value }))
  }

  // const [status, setStatus] = useState(initialStatus)
  const [basePrice, setBasePrice] = useState(initialBasePrice)
  const [discountedPrice, setDiscountedPrice] = useState(initialDiscountedPrice)
  const [comparePrice, setComparePrice] = useState(initialComparePrice)
  const [costPrice, setCostPrice] = useState(initialCostPrice)
  const [quantity, setQuantity] = useState(initialQuantity)

  // const [chargeTax, setChargeTax] = useState(initialChargeTax)
  // const [inStock, setInStock] = useState(initialInStock)

  const handleCurrencyChange = (newCurrency: Currency) => {
    const currency = {
      id: '2',
      code: 'EURO',
      symbol: '€',
      exchangeRate: 1.0,
      isDefault: true,
      isActive: true,
    }

    dispatch(setCurrency(currency));

    // dispatch(setCurrency(newCurrency));
  };

  useEffect(() => {
    const initialPriceData = prices.find(p => p.currencyId === currency.id);

    if (initialPriceData) {
      setBasePrice(initialPriceData.price);
      setDiscountedPrice(initialPriceData.discountPrice || '');
      setComparePrice(initialPriceData.comparePrice || '');
      setCostPrice(initialPriceData.cost || '');
      setQuantity(initialPriceData.quantity?.toString() || '');
    } else {
      // Reset to initial values if no price data found for the new currency
      setBasePrice('');
      setDiscountedPrice('');
      setComparePrice('');
      setCostPrice('');
      setQuantity('');
    }
  }, [currency.id, prices]);

  const handleBasePriceChange = (value: string) => {
    setBasePrice(value);
    handlePriceChange(currency.id, 'price', value);
  };

  const handleDiscountedPriceChange = (value: string) => {
    setDiscountedPrice(value);
    handlePriceChange(currency.id, 'discountPrice', value);
  };

  const handleComparePriceChange = (value: string) => {
    setComparePrice(value);
    handlePriceChange(currency.id, 'comparePrice', value);
  };

  const handleCostPriceChange = (value: string) => {
    setCostPrice(value);
    handlePriceChange(currency.id, 'cost', value);
  };

  const handleQuantityChange = (value: string) => {
    setQuantity(value);

    // Handle quantity change if needed, or dispatch another action
  };

  return (
    <Card>
      <CardHeader
        title='Pricing'
        action={
          <FormControl variant="outlined" size="small">
            <InputLabel id="currency-select-label">Currency</InputLabel>
            <Select
              labelId="currency-select-label"
              value={currency.code}
              onChange={(e) => handleCurrencyChange(e.target.value)}
            >
              <MenuItem value='USD'>USD</MenuItem>
              <MenuItem value='EUR'>EUR</MenuItem>
              <MenuItem value='INR'>INR</MenuItem>
              <MenuItem value='GBP'>GBP</MenuItem>
            </Select>
          </FormControl>
        }
      />
      <CardContent>
        <Form>
          <FormControl fullWidth className='mbe-5'>
            <InputLabel>Select Status</InputLabel>
            <Select
              label='Select Status'
              value={status}
              onChange={(e) => addBasicInfo('status', e.target.value)}
            >
              <MenuItem value='PUBLISHED'>Published</MenuItem>
              <MenuItem value='INACTIVE'>Inactive</MenuItem>
              <MenuItem value='DRAFT'>Draft</MenuItem>
            </Select>
          </FormControl>
          <TextField
            fullWidth
            label='Base Price'
            placeholder='Enter Base Price'
            value={basePrice}
            onChange={(e) => handleBasePriceChange(e.target.value)}
            className='mbe-5'
          />
          <TextField
            fullWidth
            label='Discounted Price'
            value={discountedPrice}
            onChange={(e) => handleDiscountedPriceChange(e.target.value)}
            className='mbe-5'
          />
          <TextField
            fullWidth
            label='Compare Price'
            value={comparePrice}
            onChange={(e) => handleComparePriceChange(e.target.value)}
            className='mbe-5'
          />
          <TextField
            fullWidth
            label='Cost Price'
            value={costPrice}
            onChange={(e) => handleCostPriceChange(e.target.value)}
            className='mbe-5'
          />
          <TextField
            fullWidth
            label='Quantity'
            value={quantity}
            onChange={(e) => addBasicInfo('quantity', e.target.value)}
            className='mbe-5'
          />
          <FormControlLabel
            control={
              <Checkbox
                checked={chargeTax}
                onChange={(e) => addBasicInfo('chargeTax', e.target.value)}
              />
            }
            label='Charge tax on this product'
          />
          <Divider className='mlb-2' />
          <div className='flex items-center justify-between'>
            <Typography>In stock</Typography>
            <Switch
              checked={inStock}
              onChange={(e) => addBasicInfo('inStock', e.target.value)}
            />
          </div>
        </Form>
      </CardContent>
    </Card>
  )
}

export default ProductPricing
