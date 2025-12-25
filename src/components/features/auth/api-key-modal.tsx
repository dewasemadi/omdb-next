"use client"

import { createPortal } from "react-dom"
import { motion, AnimatePresence } from "framer-motion"
import { useRouter } from "next/navigation"
import { toast } from "sonner"
import { Key, X } from "lucide-react"
import axios from "axios"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { FormEvent, ReactNode, useEffect, useState } from "react"

interface ApiKeyModalProps {
  open?: boolean
  onOpenChange?: (open: boolean) => void
  trigger?: ReactNode
}

export function ApiKeyModal({
  open: controlledOpen,
  onOpenChange: controlledOnOpenChange,
  trigger,
}: ApiKeyModalProps) {
  const [uncontrolledOpen, setUncontrolledOpen] = useState(false)
  const isControlled = controlledOpen !== undefined
  const open = isControlled ? controlledOpen : uncontrolledOpen
  const onOpenChange = isControlled
    ? controlledOnOpenChange
    : setUncontrolledOpen

  const [apiKey, setApiKey] = useState("")
  const [loading, setLoading] = useState(false)
  const [checking, setChecking] = useState(true)
  const [mounted, setMounted] = useState(false)
  const router = useRouter()

  useEffect(() => {
    setMounted(true)
  }, [])

  useEffect(() => {
    const checkKey = async () => {
      try {
        const { data } = await axios.get<{
          has_key: boolean
          api_key?: string
        }>("/api/auth/api-key")

        if (data.api_key) {
          setApiKey(data.api_key)
        }

        if (!data.has_key) {
          // If no key, open modal naturally if not controlled
          if (!isControlled) {
            setUncontrolledOpen(true)
          }
        }
      } catch (error) {
        console.error("Failed to check API key status", error)
      } finally {
        setChecking(false)
      }
    }

    // Always check key to prefill input
    checkKey()
  }, [trigger, isControlled])

  const onSubmit = async (e: FormEvent) => {
    e.preventDefault()
    if (!apiKey.trim()) return

    setLoading(true)
    try {
      await axios.post("/api/auth/api-key", { api_key: apiKey })
      toast.success("API Key saved successfully")
      onOpenChange?.(false)
      router.refresh()
    } catch {
      toast.error("Failed to save API Key")
    } finally {
      setLoading(false)
    }
  }

  // Handle ESC key
  useEffect(() => {
    const onEsc = (e: KeyboardEvent) => {
      if (e.key === "Escape" && open) onOpenChange?.(false)
    }
    window.addEventListener("keydown", onEsc)
    return () => window.removeEventListener("keydown", onEsc)
  }, [open, onOpenChange])

  if (checking && !trigger) return null

  if (!mounted) return null

  return (
    <>
      {trigger && (
        <div onClick={() => onOpenChange?.(true)} className="inline-block">
          {trigger}
        </div>
      )}
      {createPortal(
        <AnimatePresence>
          {open && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 backdrop-blur-sm p-4"
            >
              <motion.div
                initial={{ scale: 0.95, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                exit={{ scale: 0.95, opacity: 0 }}
                transition={{ duration: 0.2 }}
                className="relative w-full max-w-lg overflow-hidden rounded-2xl bg-white p-6 shadow-lg dark:bg-zinc-950 border border-zinc-200 dark:border-zinc-800"
              >
                <div className="flex flex-col space-y-1.5 text-center sm:text-left">
                  <h2 className="text-lg font-semibold leading-none tracking-tight">
                    Set OMDb API Key
                  </h2>
                  <p className="text-sm text-zinc-500 dark:text-zinc-400">
                    Enter your OMDb API key to continue. It is stored securely
                    in your browser cookies.{" "}
                    <a
                      href="http://www.omdbapi.com/apikey.aspx"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="underline hover:text-zinc-900 dark:hover:text-zinc-100"
                    >
                      Get your API key here
                    </a>
                    .
                  </p>
                </div>

                <form onSubmit={onSubmit} className="grid gap-4 mt-4">
                  <div className="flex items-center gap-4">
                    <Key className="h-4 w-4 text-zinc-500" />
                    <Input
                      id="apiKey"
                      value={apiKey}
                      onChange={(e) => setApiKey(e.target.value)}
                      placeholder="Enter your API Key..."
                      className="col-span-3"
                      disabled={loading}
                    />
                  </div>
                  <div className="flex flex-col-reverse sm:flex-row sm:justify-end sm:space-x-2">
                    <Button type="submit" disabled={loading || !apiKey.trim()}>
                      {loading ? "Saving..." : "Save API Key"}
                    </Button>
                  </div>
                </form>
                <Button
                  variant="ghost"
                  size="icon"
                  onClick={() => onOpenChange?.(false)}
                  className="absolute right-4 top-4 h-6 w-6 rounded-md opacity-70 ring-offset-white transition-opacity hover:opacity-100 focus:outline-none focus:ring-2 focus:ring-zinc-950 focus:ring-offset-2 disabled:pointer-events-none data-[state=open]:bg-zinc-100 data-[state=open]:text-zinc-500 dark:ring-offset-zinc-950 dark:focus:ring-zinc-300 dark:data-[state=open]:bg-zinc-800 dark:data-[state=open]:text-zinc-400"
                >
                  <X className="h-4 w-4" />
                  <span className="sr-only">Close</span>
                </Button>
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>,
        document.body
      )}
    </>
  )
}
