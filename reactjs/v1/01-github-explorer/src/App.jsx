import './styles/global.scss';

import { RepositoryList } from './components/RepositoryList';
import { Counter } from './components/Counter';

export function App() {
  return (
    <>
      <RepositoryList />
      <Counter />
    </>
  )
}