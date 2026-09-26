import { Component, type ReactNode } from 'react'
import { MESSAGES } from '@/constants'
import { Notice } from '../Notice/Notice'

export interface ErrorBoundaryProps {
  children: ReactNode
  fallback?: (reset: () => void) => ReactNode
}

interface ErrorBoundaryState {
  hasError: boolean
}

// React only supports error boundaries as class components.
export class ErrorBoundary extends Component<ErrorBoundaryProps, ErrorBoundaryState> {
  state: ErrorBoundaryState = { hasError: false }

  static getDerivedStateFromError(): ErrorBoundaryState {
    return { hasError: true }
  }

  reset = () => this.setState({ hasError: false })

  render() {
    if (!this.state.hasError) return this.props.children
    if (this.props.fallback) return this.props.fallback(this.reset)
    return <Notice message={MESSAGES.GENERIC_ERROR} onAction={this.reset} />
  }
}
