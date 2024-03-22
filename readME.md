# NutriCount

## Visão Geral
NutriCount é um aplicativo móvel desenvolvido em React Native, projetado para auxiliar os usuários no monitoramento de sua ingestão diária de calorias,
peso ideal e quantidade de macros, de acordo com seus objetivos. Além disso, o aplicativo fornece informações sobre o Índice de Massa Corporal (IMC) 
e o percentual de gordura corporal, permitindo que os usuários tenham uma visão abrangente de sua saúde e progresso.

## Funcionalidades Principais
### Monitoramento de Calorias e Macros
NutriCount permite aos usuários inserir seus dados pessoais, como idade, peso, medidas corporais, nível de atividade e objetivo.
Com base nessas informações, o aplicativo calcula a quantidade ideal de calorias e macros para ajudar os usuários a atingirem seus objetivos de forma eficaz.

### Visualização das Informações
Na tela principal, os usuários podem visualizar cards com as calorias diárias, IMC, macros (proteínas, carboidratos e gorduras), percentual de gordura corporal e peso ideal.
Esses dados são atualizados automaticamente com base nas informações inseridas pelo usuário e são facilmente acessíveis para acompanhamento contínuo de seu desenvolvimento.

### Gerenciamento de Perfil
A tela de perfil permite aos usuários visualizar e editar suas informações pessoais a qualquer momento. 
Isso garante que os dados exibidos na tela principal estejam sempre alinhados com as metas e necessidades individuais de cada usuário.

## Telas
https://github.com/JulyannaC/AppFitness/assets/128107511/86633295-33ed-49cb-a3c6-437f6b788459

### LoginScreen
A tela de login serve como o ponto de entrada para os usuários, onde eles podem inserir suas credenciais e acessar o aplicativo. 
Com um design exclusivo, incluindo uma imagem de fundo personalizada e a logo do NutriCount, esta tela proporciona uma experiência acolhedora e intuitiva para os usuários.

### HomeScreen
Na tela inicial, os usuários podem visualizar os cards com seu consumo de calorias, macros e outros indicadores-chave de saúde. 
Esses dados são atualizados dinamicamente com base nas informações fornecidas pelo usuário no perfil.  

### ProfileScreen
A tela de perfil permite aos usuários visualizar e editar suas informações pessoais.
Qualquer alteração feita nesta tela refletirá automaticamente nos cálculos de calorias, macros e outras métricas exibidas na HomeScreen.

**Ambas as informações, do perfil e da tela inicial, são armazenadas localmente utilizando AsyncStorage. 
Isso significa que mesmo quando o usuário fecha o aplicativo e o abre novamente, seus dados pessoais e de progresso são preservados, 
proporcionando uma experiência contínua e sem interrupções.**

## Tecnologias usadas
O aplicativo NutriCount foi construído usando as seguintes tecnologias:

- JavaScript: principal linguagem de programação utilizada no desenvolvimento de aplicativos.

- React Native: Biblioteca javascript usada para desenvolvimento de aplicativos móveis multiplataforma.

- API Fitness Calculator: NutriCount faz uso da API Fitness Calculator (https://rapidapi.com/malaaddincelik/api/fitness-calculator/)
para realizar cálculos precisos relacionados à saúde e fitness. Esta API fornece os recursos necessários para calcular calorias, macros
e outros indicadores importantes com base nos dados fornecidos pelos usuários.

### Com NutriCount, monitorar sua saúde e alcançar seus objetivos nunca foi tão fácil e conveniente! 
