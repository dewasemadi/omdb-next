import { useState, useEffect } from "react"
import { useAppDispatch, useAppSelector } from "@/stores/hooks"
import {
  setSearchQuery,
  fetchAutocomplete,
  clearAutocomplete,
  resetMovies,
  fetchMovies,
} from "@/stores/slices/movie-slice"
import { useDebounce } from "@/hooks/use-debounce" // Keep for autocomplete if needed, or use q logic
import SearchBar from "@/components/widgets/search-bar"
import { useQueryState, parseAsString } from "nuqs"

export default function SearchSection() {
  const dispatch = useAppDispatch()
  const autocompletedResults = useAppSelector(
    (state) => state.movies.autocompletedResults
  )

  const [q, setQ] = useQueryState(
    "q",
    parseAsString.withDefault("").withOptions({
      history: "push",
    })
  )

  const [inputValue, setInputValue] = useState(q || "")
  const [showSuggestions, setShowSuggestions] = useState(false)
  const [isSelected, setIsSelected] = useState(false)
  const debouncedInput = useDebounce(inputValue, 500)

  const onQueryChange = (val: string) => {
    setInputValue(val)
    setIsSelected(false)
  }

  const onSubmit = (e?: React.FormEvent) => {
    if (e) e.preventDefault()
    if (!inputValue.trim()) return

    setShowSuggestions(false)
    setIsSelected(true)
    setQ(inputValue)
  }

  const onSelectSuggestion = (title: string) => {
    setInputValue(title)
    setIsSelected(true)
    setShowSuggestions(false)
    setQ(title) // Update URL
  }

  const onFocus = () => {
    const isValid = inputValue.trim().length >= 3
    if (isValid && autocompletedResults.length > 0 && !isSelected) {
      setShowSuggestions(true)
    }
  }

  useEffect(() => {
    const newVal = q || ""
    if (inputValue !== newVal) setInputValue(newVal)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [q])

  useEffect(() => {
    dispatch(setSearchQuery(q || ""))
    dispatch(resetMovies())
    if (q) dispatch(fetchMovies({ query: q, page: 1 }))
  }, [q, dispatch])

  useEffect(() => {
    const isValid = debouncedInput.trim().length >= 3
    if (isValid && !isSelected) {
      dispatch(fetchAutocomplete({ query: debouncedInput.trim() }))
      setShowSuggestions(true)
    } else {
      dispatch(clearAutocomplete())
      if (!isValid) setShowSuggestions(false)
    }
  }, [debouncedInput, dispatch, isSelected])

  return (
    <SearchBar
      query={inputValue}
      onQueryChange={onQueryChange}
      onSubmit={onSubmit}
      onFocus={onFocus}
      suggestions={autocompletedResults}
      onSelectSuggestion={onSelectSuggestion}
      showSuggestions={showSuggestions}
      setShowSuggestions={setShowSuggestions}
      onClear={() => {
        setInputValue("")
        setQ(null)
      }}
    />
  )
}
