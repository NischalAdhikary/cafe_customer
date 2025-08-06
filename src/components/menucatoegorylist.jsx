import React from 'react'
import Button from './botton'
const menuitems = [
    {
        id:1,
        cateogory:"Coffee",
    },
    {
        id:2,
        cateogory:"Tea",
    },
    {
        id:3,
        cateogory:"Pastries",
    },
    {
        id:4,
        cateogory:"Sandwiches",
    },
    {
        id:5,
        cateogory:"Salads",
    },
    {
        id:6,
        cateogory:"Desserts",
    },
    {
        id:7,
        cateogory:"Beverages",
    },
    {
        id:8,
        cateogory:"Specials",
    },
    {
        id:9,
        cateogory:"Seasonal",
    },
    {
        id:10,
        cateogory:"Vegan",
    },
   
    {
        id:12,
        cateogory:"Breakfast",
    },
    {
        id:13,
        cateogory:"Lunch",
    },
    {
        id:14,
        cateogory:"Dinner",
    }
]
export default function     Menucategorylist({ onCategorySelect }) {
  return (
    <div className='flex items-center gap-3  p-4 flex-nowrap overflow-x-auto'>
      <Button 
        variant={"secondary"} 
        key="all" 
        onClick={() => onCategorySelect('All')}
      >
        All
      </Button>
      {menuitems.map((item) => (
        <Button 
          variant={"secondary"} 
          key={item.id}
          onClick={() => onCategorySelect(item.cateogory)}
        >
          {item.cateogory}
        </Button>
      ))}
    </div>
  )
}
