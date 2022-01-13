import { Input } from "@src/components/Input";
import * as S from "./styles";

export function SignIn() {
  return (
    <S.Container>
      <Input 
        placeholder="E-mail"
        autoCorrect={false}
        autoCapitalize="none"
      />

      <Input 
        placeholder="Senha"
        secureTextEntry
      />
    </S.Container>
  )
}