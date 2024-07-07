# Certify - Gerador de Certificados

## Descrição
Certify é uma plataforma de geração de certificados digitais personalizada para eventos. O objetivo é simplificar o processo de criação de certificados, permitindo a geração em lote e a personalização avançada com assinatura digital e QR codes para autenticação.

## Funcionalidades
- **Geração de Certificados Personalizados**: Crie certificados com design profissional sem habilidades avançadas de design.
- **Assinaturas Digitais**: Adicione assinaturas digitais ao certificado.
- **Geração de QR Codes**: Gera QR codes para autenticação dos certificados.
- **Backgrounds Personalizáveis**: Utilize backgrounds predefinidos ou carregue seus próprios.
- **Geração em Lote**: Crie vários certificados de uma só vez.
- **Download em PDF**: Baixe os certificados gerados em formato PDF.

## Tecnologias Utilizadas
- React
- jsPDF
- JSZip
- FileSaver
- react-router-dom

## Instalação

1. Clone o repositório:
    ```sh
    git clone https://github.com/seu-usuario/certify.git
    cd certify
    ```

2. Instale as dependências:
    ```sh
    npm install
    ```

## Uso

1. Inicie o servidor de desenvolvimento:
    ```sh
    npm start
    ```

2. Abra o navegador e navegue para `http://localhost:3000`.

## Estrutura do Projeto
certify/
├── public/
│ ├── index.html
│ └── ...
├── src/
│ ├── assets/
│ │ ├── TemplateA.jpg
│ │ └── ...
│ ├── components/
│ │ ├── BackgroundSelect.js
│ │ ├── CertificatePreview.js
│ │ ├── LandingPage.js
│ │ ├── Menu.js
│ │ ├── ProgressBar.js
│ │ ├── Background.js
│ │ ├── BackgroundSelect.js
│ │ ├── Participants.js
│ │ ├── Promoters.js
│ │ ├── Signatures.js
│ │ └── ...
│ ├── styles/
│ │ ├── App.css
│ │ ├── LandingPage.css
│ │ ├── Menu.css
│ │ └── ...
│ ├── App.js
│ ├── index.js
│ └── ...
├── .gitignore
├── package.json
└── README.md


## Navegação do Usuário
### Passos de Geração de Certificados

1. **Landing Page**: Página inicial com informações sobre o aplicativo e um botão para iniciar a geração de certificados.
2. **Escolher o Background**: Escolha um background predefinido ou carregue um personalizado.
3. **Inserção dos Nomes dos Participantes**: Adicione os nomes dos participantes, separados por quebra de linha.
4. **Inserção dos Detalhes do Evento**: Insira informações como nome do evento, tipo, local, data de início, data de término (opcional), duração e link para QR Code.
5. **Promotor do Evento e Logos**: Adicione os promotores do evento e logos (topo, rodapé ou ambos).
6. **Assinaturas**: Adicione as assinaturas dos responsáveis.
7. **Download dos Certificados**: Faça o download dos certificados gerados.

## Contribuição
Contribuições são bem-vindas! Por favor, envie um pull request ou abra uma issue para discutir o que você gostaria de mudar.

## Licença
Distribuído sob a licença MIT. Veja `LICENSE` para mais informações.



