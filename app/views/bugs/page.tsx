'use client'

import { useToast } from '@/components/ui/use-toast'
import React from 'react'
import { Button } from '@/components/ui/button'

const Bugs = () => {
  const { toast } = useToast()
  
  
  return (
    <Button
      variant="outline"
      onClick={() => {
        toast({
          description: "Your message has been sent.",
        })
      }}
    >
      Show Toast
    </Button>
  )
}

export default Bugs