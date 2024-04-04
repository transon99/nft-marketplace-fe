'use client'

import brandApi from '@/apis/brandApi'
import categoryApi from '@/apis/categoryApi'
import productApi from '@/apis/productApi'
import { CardItem } from '@/components'
import { AddProductDialog } from '@/components/Dialog'
import CustomSelect from '@/components/Input/CustomSelect '
import NullData from '@/components/NullData'
import PaginationComponent from '@/components/Pagination'
import Search from '@/components/Search'
import { CustomButton } from '@/components/common'
import { Flex, Text } from '@radix-ui/themes'
import { useEffect, useState } from 'react'
import { Controller, useForm } from 'react-hook-form'

const Product = () => {
  const [categoryId, setCategoryId] = useState<string>('')
  const [page, setPage] = useState(1)
  const [brandId, setBrandId] = useState<string>('')

  const [categories, setCategories] = useState<Category[]>([])
  const [categoryOptions, setCategoryOptions] = useState<Category[]>([])
  const [brandOptions, setBrandOptions] = useState<Category[]>([])
  const [brands, setBrands] = useState<any[]>([])
  const [products, setProducts] = useState<Product[]>([])
  console.log('====> producs', products)

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await categoryApi.getAll()
        const categoryOptions = response.data?.map((category: Category) => ({
          value: category.id,
          label: category.name
        }))
        setCategoryOptions(categoryOptions)
      } catch (error) {
        console.error('Error fetching data:', error)
      }
    }
    fetchData()
  }, [])

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await brandApi.getAll()
        const brandOptions = response.data?.map((brand: Brand) => ({
          value: brand.id,
          label: brand.name
        }))
        setBrandOptions(brandOptions)
      } catch (error) {
        console.error('Error fetching data:', error)
      }
    }
    fetchData()
  }, [])

  useEffect(() => {
    const fetchData = async () => {
      const param = {
        searchText: '',
        offset: 0,
        pageSize: 5,
        sortStr: ''
      }
      try {
        const categoriesEesponse = await categoryApi.getAll()
        setCategories(categoriesEesponse.data)
        const brandResponse = await brandApi.getAll()
        setBrands(brandResponse.data)
        const productResponse = await productApi.getByConditionAndPagination(param)
        setProducts(productResponse.data.data)
      } catch (error) {
        console.error('Error fetching data:', error)
      }
    }
    fetchData()
  }, [])

  const handleFilter = async (data: any) => {
    setCategoryId(data.category)
    setBrandId(data.brand)
    const param = {
      categoryId: data?.category,
      brandId: data?.brand,
      offset: 0,
      pageSize: 5,
      sortStr: ''
    }
    const response = await productApi.filterProduct(param)
    console.log(response)
    setProducts(response.data)
  }

  const currentCategory = categories.find((c) => c.id === categoryId)
  const handlePagination = (event: React.ChangeEvent<unknown>, value: number) => {
    console.log(value)
    setPage(value)
  }
  return (
    <div className='h-[calc(100vh-88px)] overflow-auto'>
      <div
        className='card no-hover flex flex-col gap-5 !p-5 md:!p-[26px] lg:!py-5 lg:flex-row
    lg:items-center lg:gap-4 '
      >
        <h1 className='text-primary flex-1 text-center lg:text-left text-4xl font-bold bg-[#171F29] rounded-lg !p-5 md:!p-[26px] lg:!py-5'>
          Products Management
        </h1>
      </div>
      <div className='flex flex-col-reverse gap-4  md:flex-col lg:flex-row lg:justify-between p-5 pt-0'>
        <Flex direction={'column'} gap={'3'}>
          <AddProductDialog categoryOptions={categoryOptions} brandOptions={brandOptions} />
        </Flex>
        <div className='relative lg:w-[326px]'>
          <Search placeholder='Search Product ...' />
        </div>
      </div>
      <div>
        {products.length == 0 ? (
          <NullData title="DON'T HAVE ANY PRODUCT YET" />
        ) : (
          <div>
            <div
              className='grid flex-1 items-start gap-[26px] mb-[30px] sm:  md:grid-cols-2
                 lg:grid-cols-3 2xl:grid-cols-4 p-5'
            >
              {products.map((product) => (
                <CardItem
                  product={product}
                  key={product.id}
                  categoryOptions={categoryOptions}
                  brandOptions={brandOptions}
                />
              ))}
            </div>
            <div className='flex items-center justify-center'>
              <PaginationComponent count={10} page={page} handleChange={handlePagination} />
            </div>
          </div>
        )}
      </div>
    </div>
  )
}

export default Product
