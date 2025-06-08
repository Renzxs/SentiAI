import type { CodegenConfig } from '@graphql-codegen/cli'

const config: CodegenConfig = {
  overwrite: true,
  schema: {
    ['http://localhost:9090/graphql']: {
      headers: {
        authorization: `Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6ImQyZWFhYWZmLTI3ZmItNGNhMS04MjlkLWQ4OWFkYjBhNWJmNyIsImVtYWlsIjoiZmxvcmVuY2ViYXRvbDg1QGdtYWlsLmNvbSIsImlhdCI6MTc0OTE5MTk0OCwiZXhwIjoxODM1NTkxOTQ4fQ.cUu4VZ67Yv05ScMEIB6A98wmiMhMbQYFTz0My1I-UE0`,
      },
    },
  },
  documents: 'src/app/**/*.ts',
  generates: {
    'src/gql/': {
      preset: 'client',
      plugins: [],
    },
  },
}

export default config