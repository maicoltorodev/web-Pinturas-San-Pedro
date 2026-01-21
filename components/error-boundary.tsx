'use client'

/**
 * Error Boundary para capturar errores de React
 */

import React, { Component, type ReactNode } from 'react'
import { AlertCircle } from 'lucide-react'
import { Button } from '@/components/ui/button'

interface Props {
  children: ReactNode
  fallback?: ReactNode
  onError?: (error: Error, errorInfo: React.ErrorInfo) => void
}

interface State {
  hasError: boolean
  error: Error | null
}

export class ErrorBoundary extends Component<Props, State> {
  constructor(props: Props) {
    super(props)
    this.state = { hasError: false, error: null }
  }

  static getDerivedStateFromError(error: Error): State {
    return { hasError: true, error }
  }

  componentDidCatch(error: Error, errorInfo: React.ErrorInfo) {
    console.error('Error capturado por ErrorBoundary:', error, errorInfo)
    this.props.onError?.(error, errorInfo)
  }

  handleReset = () => {
    this.setState({ hasError: false, error: null })
  }

  render() {
    if (this.state.hasError) {
      if (this.props.fallback) {
        return this.props.fallback
      }

      return (
        <div className="flex min-h-[400px] flex-col items-center justify-center gap-4 p-8 text-center">
          <AlertCircle className="h-12 w-12 text-destructive" />
          <h2 className="text-2xl font-bold text-foreground">Algo salió mal</h2>
          <p className="text-muted-foreground max-w-md">
            Lo sentimos, ocurrió un error inesperado. Por favor, intenta recargar la página.
          </p>
          {process.env.NODE_ENV === 'development' && this.state.error && (
            <details className="mt-4 max-w-2xl text-left">
              <summary className="cursor-pointer text-sm font-semibold text-muted-foreground">
                Detalles del error (solo en desarrollo)
              </summary>
              <pre className="mt-2 overflow-auto rounded bg-muted p-4 text-xs">
                {this.state.error.toString()}
                {this.state.error.stack}
              </pre>
            </details>
          )}
          <Button onClick={this.handleReset} variant="secondary">
            Intentar de nuevo
          </Button>
        </div>
      )
    }

    return this.props.children
  }
}
