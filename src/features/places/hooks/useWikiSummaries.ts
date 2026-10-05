import { useEffect, useState } from 'react'
import { getSummaries, type WikiSummary } from '@/services/wikipedia'
import type { Place } from '@/types'

// Photos and blurbs for places that link a Wikipedia article, fetched in one go.
// They're a nice extra, so a failed request just leaves the cards as they were.
export const useWikiSummaries = (places: Place[]) => {
  const titles = [...new Set(places.flatMap((place) => (place.wiki ? [place.wiki] : [])))]
  const key = titles.join('|')
  const [summaries, setSummaries] = useState(new Map<string, WikiSummary | null>())

  useEffect(() => {
    if (!key) return
    const controller = new AbortController()
    getSummaries(key.split('|'), controller.signal)
      .then(setSummaries)
      .catch(() => {})
    return () => controller.abort()
  }, [key])

  return (place: Place) => (place.wiki ? (summaries.get(place.wiki) ?? null) : null)
}
