import type { PayloadAction } from '@reduxjs/toolkit';
import { createSlice } from '@reduxjs/toolkit'

interface ProductPrice {
    currencyId: string
    origin: string
    price: string
    discountPrice?: string
    comparePrice?: string
    cost?: string
}

interface ProductTranslation {
    languageId: string
    name: string
    description?: string
    metaTitle?: string
    metaDesc?: string
    keywords?: string
}

interface ProductVariationPrice {
    currencyId: string
    origin: string
    price: string
    discountPrice?: string
    comparePrice?: string
    cost?: string
}

interface ProductVariation {
    id: string
    sku: string
    quantity: number
    attributes: Record<string, string>
    prices: ProductVariationPrice[]
    isActive: boolean
}

interface ProductMedia {
    type: string
    url: string
    alt?: string
    title?: string
    sortOrder: number
}

interface ProductAttribute {
    id: string
    type: string
    value: string
}

interface Language {
    id: number;
    langCode: string; // e.g., 'en', 'fr'
    langName: string; // e.g., 'English', 'French'
}

interface Currency {
    id: string;
    code: string; // e.g., 'USD', 'EUR'
    symbol: string; // e.g., '$', '€'
    exchangeRate: number; // e.g., 1.0 for USD
    isDefault: boolean;
    isActive: boolean;
}

interface Product {
    id: string;
    name: string;
    description: string;
    sku: string;
    barcode?: string;
    translations: ProductTranslation[];

    // Add other product fields as necessary
}

interface ProductState {

    // Basic Information
    status: 'DRAFT' | 'PUBLISHED' | 'INACTIVE'
    sku: string
    barcode?: string

    // Translations for different languages
    translations: ProductTranslation[]

    // Pricing for different currencies/origins
    prices: ProductPrice[]

    // Media
    mainImage?: ProductMedia
    galleryImages: ProductMedia[]

    // Inventory
    quantity: number
    weight?: number
    isActive: boolean

    // Variants
    attributes: ProductAttribute[]
    variations: ProductVariation[]

    // Organization
    categoryIds: string[]
    brandId?: string
    vendorIds: string[]
    storeIds: string[]
    collectionIds: string[]
    tags: string[]

    // Additional Settings
    chargeTax: boolean
    inStock: boolean
    metadata?: Record<string, any>

    // Form Status
    isSubmitting: boolean
    isDirty: boolean
    errors: Record<string, string>

    // Add the language property
    language: Language;

    // Add the current product property
    currentProduct: Product | null;

    // Add the currency property
    currency: Currency;
}

const initialState: ProductState = {
    status: 'DRAFT',
    sku: '',
    translations: [],
    prices: [],
    galleryImages: [],
    quantity: 0,
    isActive: true,
    attributes: [],
    variations: [],
    categoryIds: [],
    vendorIds: [],
    storeIds: [],
    collectionIds: [],
    tags: [],
    chargeTax: false,
    inStock: true,
    isSubmitting: false,
    isDirty: false,
    errors: {},
    language: {
        id: 1,
        langCode: 'en',
        langName: 'English'
    },
    currentProduct: null,
    currency: {
        id: '1',
        code: 'USD',
        symbol: '$',
        exchangeRate: 1.0,
        isDefault: true,
        isActive: true,
    }
}

const productSlice = createSlice({
    name: 'product',
    initialState,
    reducers: {
        // Basic Information
        setBasicInfo: (state, action: PayloadAction<{
            sku: string
            barcode?: string
            status?: 'DRAFT' | 'PUBLISHED' | 'INACTIVE'
        }>) => {
            Object.assign(state, action.payload)
            state.isDirty = true
        },

        // Translations
        addTranslation: (state, action: PayloadAction<ProductTranslation>) => {
            const index = state.translations.findIndex(t => t.languageId === action.payload.languageId)

            console.log('action', action)

            if (index >= 0) {
                state.translations[index] = { ...state.translations[index], ...action.payload }
            } else {
                state.translations.push(action.payload)
            }

            state.isDirty = true
        },

        // Pricing
        addPrice: (state, action: PayloadAction<ProductPrice>) => {
            const index = state.prices.findIndex(
                p => p.currencyId === action.payload.currencyId
            )

            if (index >= 0) {
                state.prices[index] = { ...state.prices[index], ...action.payload }
            } else {
                state.prices.push(action.payload)
            }

            state.isDirty = true
        },

        // Media
        setMainImage: (state, action: PayloadAction<ProductMedia>) => {
            state.mainImage = action.payload
            state.isDirty = true
        },

        addGalleryImage: (state, action: PayloadAction<ProductMedia>) => {
            state.galleryImages.push(action.payload)
            state.isDirty = true
        },

        removeGalleryImage: (state, action: PayloadAction<number>) => {
            state.galleryImages.splice(action.payload, 1)
            state.isDirty = true
        },

        // Variants
        setAttributes: (state, action: PayloadAction<ProductAttribute[]>) => {
            state.attributes = action.payload
            state.isDirty = true
        },

        setVariations: (state, action: PayloadAction<ProductVariation[]>) => {
            state.variations = action.payload
            state.isDirty = true
        },

        // Organization
        setOrganization: (state, action: PayloadAction<{
            categoryIds?: string[]
            brandId?: string
            vendorIds?: string[]
            storeIds?: string[]
            collectionIds?: string[]
            tags?: string[]
        }>) => {
            Object.assign(state, action.payload)
            state.isDirty = true
        },

        // Form Status
        setSubmitting: (state, action: PayloadAction<boolean>) => {
            state.isSubmitting = action.payload
        },

        resetForm: () => initialState,

        setErrors: (state, action: PayloadAction<Record<string, string>>) => {
            state.errors = action.payload
        },

        // Add a reducer to set the current product based on the selected language
        setCurrentProduct: (state, action: PayloadAction<Product>) => {
            state.currentProduct = action.payload;
        },

        // Add a reducer to change the language
        setLanguage: (state, action: PayloadAction<Language>) => {
            state.language = action.payload;
            state.isDirty = true; // Mark the state as dirty if needed

            // Filter the current product based on the new language
            const filteredProduct = state.translations.find(t => t.languageId === action.payload.langCode);

            if (filteredProduct) {
                state.currentProduct = filteredProduct; // Update currentProduct with the filtered product
            } else {
                state.currentProduct = null; // Reset if no matching translation found
            }
        },

        // Add a reducer to change the currency
        setCurrency: (state, action: PayloadAction<Currency>) => {
            state.currency = action.payload;
            state.isDirty = true; // Mark the state as dirty if needed
        },
    }
})

export const {
    setBasicInfo,
    addTranslation,
    addPrice,
    setMainImage,
    addGalleryImage,
    removeGalleryImage,
    setAttributes,
    setVariations,
    setOrganization,
    setSubmitting,
    resetForm,
    setErrors,
    setCurrentProduct,
    setLanguage,
    setCurrency
} = productSlice.actions

export default productSlice.reducer 
