import { useContextSelector } from 'use-context-selector'
import { MagnifyingGlass } from 'phosphor-react'
import { useForm } from 'react-hook-form'
import * as z from 'zod'
import { zodResolver } from '@hookform/resolvers/zod'
import { memo } from 'react'

import { TransactionsContext } from '../../../../contexts/TransactionsContext'

import { SearchFormContainer } from './styles'

const searchFormSchema = z.object({
  query: z.string(),
})

type SearchFormInputs = z.infer<typeof searchFormSchema>

function SearchFormComponent() {
  const fetchTransactions = useContextSelector(
    TransactionsContext,
    (context) => context.fetchTransactions,
  )

  const {
    register,
    handleSubmit,
    formState: { isSubmitting },
  } = useForm<SearchFormInputs>({
    resolver: zodResolver(searchFormSchema),
  })

  async function handleSearchTransactions(data: SearchFormInputs) {
    await fetchTransactions(data.query)
  }

  return (
    <SearchFormContainer onSubmit={handleSubmit(handleSearchTransactions)}>
      <input
        type="text"
        placeholder="Busque por transações"
        {...register('query')}
      />

      <button type="submit" disabled={isSubmitting}>
        <MagnifyingGlass size={20} />
        Buscar
      </button>
    </SearchFormContainer>
  )
}

export const SearchForm = memo(SearchFormComponent)
