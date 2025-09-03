import React from 'react'
import { X } from 'lucide-react'
import Button from './botton'



export default function Menuvariant({ onClose,item }) {
    console.log('Menuvariant props:', item);
    
  const [selectedVariant, setSelectedVariant] = React.useState(null)

  return (
    <div className='w-full h-full p-4 bg-white rounded-lg space-y-12'>
  
      <div className='flex justify-between items-center  '>
        <h2 className='text-xl text-center font-semibold text-gray-800'>
         {item.name}
        </h2>
        <button 
          onClick={onClose}
          className='p-2 hover:bg-gray-100 rounded-full'
        >
          <X size={24} />
        </button>
      </div> 

     
      <div className='space-y-4 my-6'>
        <h3 className='text-lg font-medium text-gray-700'>Select Variant</h3>
        {item.options.map((variant) => (
          <label 
            key={variant.id} 
            className='flex items-center justify-between p-3 border rounded-lg hover:bg-gray-50 cursor-pointer'
          >
            <div className='flex items-center gap-3'>
              <input
                type="radio"
                name="variant"
                value={variant.id}
                checked={selectedVariant === variant.id}
                onChange={() => setSelectedVariant(variant.id)}
                className='w-4 h-4 text-blue-600'
              />
              <span className='text-gray-700'>{variant.name}</span>
            </div>
            <span className='font-medium text-green-600'>
              ${variant.price.toFixed(2)}
            </span>
          </label>
        ))}
      </div>

   
      <div className='mt-6 border-t pt-4'>
        <Button 
          variant="primary"
          className='w-full'
          onClick={() => console.log('Added to cart:', selectedVariant)}
        >
          Add to Cart
        </Button>
      </div>
    </div>
  )
}