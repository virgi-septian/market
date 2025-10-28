import React from 'react'
import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import { Spinner } from "@/components/ui/spinner"
import "./globals.css";

export default function loading() {
  return (
    <div className='flex flex-col items-center w-full h-screen justify-center'>
        <Spinner />
    </div>
  )
}
