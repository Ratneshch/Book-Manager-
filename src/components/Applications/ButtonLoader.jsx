import React from 'react'
import { Button } from '../ui/button'
import { Loader2 } from "lucide-react";
import { cn } from '@/lib/utils'

const ButtonLoader = ({text, type, onClick, className, loading, ...props}) => {
  return (
    <Button className={cn("", className)} text={text} type={type} onClick={onClick} disabled={loading} {...props}>
        {loading && <Loader2 className='animate-spin' />}
        {text}
    </Button>

  )
}

export default ButtonLoader