# Logging Infrastructure 📝

## Overview

This project uses a **context-aware logging strategy** with different approaches for server-side (SSR/API) and client-side code.

## Server-Side Logging

### Logger: Pino

**Location**: `src/utils/logger.ts`

High-performance structured logging for server-side code (API routes, SSR, server functions).

#### Features

- ✅ **Structured JSON logs** in production for log aggregation
- ✅ **Pretty-printed output** in development with colors and timestamps
- ✅ **Type-safe** with helper functions
- ✅ **Performance optimized** (Pino is one of the fastest loggers)

#### Usage

```typescript
import { log } from '~/utils/logger';

// Information logging
log.info('User submitted contact form', { 
  formName: 'contact',
  email: 'user@example.com' 
});

// Error logging with error object
log.error('API call failed', error, { 
  endpoint: '/api/contact',
  status: 500 
});

// Warning logging
log.warn('Rate limit approaching', { 
  requests: 95,
  limit: 100 
});

// Debug logging (DEV only)
log.debug('Processing request', { 
  userId: 123,
  timestamp: Date.now() 
});
```

#### Log Levels

| Level   | DEV | PROD | Use Case                       |
| ------- | --- | ---- | ------------------------------ |
| `debug` | ✅   | ❌    | Detailed debugging information |
| `info`  | ✅   | ✅    | General informational messages |
| `warn`  | ✅   | ✅    | Warning conditions             |
| `error` | ✅   | ✅    | Error conditions               |

#### Output Format

**Development**:
```
10:23:45 INFO: User submitted contact form
    formName: "contact"
    email: "user@example.com"
```

**Production** (JSON):
```json
{"level":30,"time":1732377825000,"msg":"User submitted contact form","formName":"contact","email":"user@example.com"}
```

---

## Client-Side Logging

### Logger: clientLogger

**Location**: `src/utils/clientLogger.ts`

Development-only console logging for React components and client-side code.

#### Features

- ✅ **DEV-only output** (completely removed in production)
- ✅ **Tree-shaken** by bundler in production builds
- ✅ **Emoji indicators** for quick visual scanning
- ✅ **Type-safe** with ESLint exemptions

#### Usage

```typescript
import { clientLog } from '~/utils/clientLogger';

// Information (ℹ️)
clientLog.info('Component mounted', { componentId: 'ContactForm' });

// Error (❌)
clientLog.error('API call failed', error);

// Warning (⚠️)
clientLog.warn('Deprecated prop used', { prop: 'component' });

// Debug (🔍)
clientLog.debug('State updated', { prevState, newState });
```

#### Production Behavior

All `clientLog` calls are **completely removed** from production builds:

```typescript
// In source:
clientLog.info('Debug message', data);

// In production build:
// (completely removed - zero overhead)
```

---

## When to Use Each Logger

### Use Server Logger (`log`) for:

- ✅ API routes (`src/pages/api/**`)
- ✅ SSR page rendering errors
- ✅ Server-side data fetching
- ✅ Authentication/authorization events
- ✅ Rate limiting and security events
- ✅ Third-party API failures
- ✅ Database operations

**Example**:
```typescript
// src/pages/api/contact.ts
import { log } from '~/utils/logger';

try {
  await submitToNetlify(data);
  log.info('Form submitted successfully', { formName: 'contact' });
} catch (error) {
  log.error('Form submission failed', error, { formName: 'contact' });
  throw error;
}
```

### Use Client Logger (`clientLog`) for:

- ✅ React component lifecycle events
- ✅ User interaction tracking (debugging)
- ✅ Third-party script loading (Maps, reCAPTCHA)
- ✅ Client-side validation errors
- ✅ Development debugging

**Example**:
```typescript
// src/components/ContactForm.tsx
import { clientLog } from '~/utils/clientLogger';

useEffect(() => {
  clientLog.info('ContactForm mounted');
  return () => clientLog.info('ContactForm unmounted');
}, []);

const handleError = (error: Error) => {
  clientLog.error('Form validation failed', error);
  toast.error('Please check your input');
};
```

### Use CLI Console Statements for:

- ✅ Build scripts (`src/services/contentful/**`)
- ✅ Migration scripts
- ✅ Development tools
- ✅ Task runners

**Example**:
```javascript
// src/services/contentful/processCourseTournaments.js
console.log('🏌️  Processing tournament:', tournamentName);
console.log('✅ Created 5 entries');
console.error('❌ Failed to process:', error);
```

---

## Configuration

### Biome Linting

Logger files have special exemptions in `biome.jsonc`:

```jsonc
{
  "overrides": [
    {
      "includes": ["**/utils/logger.ts", "**/utils/clientLogger.ts"],
      "linter": {
        "rules": {
          "suspicious": {
            "noConsole": "off"
          }
        }
      }
    }
  ]
}
```

### ESLint

Client logger uses inline exemptions:

```typescript
// eslint-disable-next-line no-console
console.log(`ℹ️ ${message}`, ...args);
```

---

## Best Practices

### ✅ DO:

```typescript
// Structured logging with context
log.error('Payment failed', error, { 
  userId: user.id,
  amount: payment.amount,
  paymentId: payment.id 
});

// DEV-only client logging
if (import.meta.env.DEV) {
  clientLog.debug('State change', { before, after });
}

// Meaningful messages
log.info('Tournament created successfully', { 
  tournamentId: tournament.id,
  date: tournament.date 
});
```

### ❌ DON'T:

```typescript
// ❌ Raw console statements in production code
console.log('Debug info');

// ❌ Logging sensitive data
log.info('User logged in', { password: user.password }); // NO!

// ❌ Excessive logging in hot paths
for (const item of items) {
  log.debug('Processing item', item); // Performance issue!
}

// ❌ Unstructured error logging
log.error(`Error: ${error.message}`); // Use error object instead
```

---

## Migration from Console Statements

### Before

```typescript
try {
  const result = await apiCall();
  console.log('API success:', result);
} catch (err) {
  console.error('API failed:', err);
}
```

### After

**Server-side**:
```typescript
import { log } from '~/utils/logger';

try {
  const result = await apiCall();
  log.info('API call succeeded', { endpoint: '/api/data' });
} catch (error) {
  log.error('API call failed', error, { endpoint: '/api/data' });
  throw error;
}
```

**Client-side**:
```typescript
import { clientLog } from '~/utils/clientLogger';

try {
  const result = await apiCall();
  clientLog.info('API call succeeded');
} catch (error) {
  clientLog.error('API call failed', error);
  throw error;
}
```

---

## Production Monitoring

### Netlify Functions

Server logs are automatically captured by Netlify and available in:
- **Netlify Dashboard** → Functions → Logs
- **Real-time streaming** during development

### Log Aggregation (Future)

For advanced monitoring, Pino's JSON output integrates with:
- **Datadog**: [pino-datadog](https://github.com/ovhemert/pino-datadog)
- **CloudWatch**: [pino-cloudwatch](https://github.com/dbinit/pino-cloudwatch)
- **Elasticsearch**: [pino-elasticsearch](https://github.com/pinojs/pino-elasticsearch)
- **Sentry**: [pino-sentry](https://github.com/aantonov/pino-sentry-transport)

---

## Testing

### Development

Start dev server to see pretty logs:

```bash
pnpm dev
```

**Expected output**:
```
10:23:45 INFO: Server started on port 4321
10:24:12 INFO: User submitted contact form
    formName: "contact"
    email: "test@example.com"
```

### Production Build

Build and preview to verify logs are working:

```bash
pnpm build && pnpm preview
```

**Logs should be**:
- JSON formatted in terminal
- Available in Netlify Function logs after deployment

---

## Performance

### Server Logger (Pino)

- **Benchmark**: ~30% faster than Winston, 2x faster than Bunyan
- **Async logging**: Non-blocking I/O operations
- **Zero dependencies**: Minimal bundle overhead

### Client Logger

- **Production**: Zero overhead (tree-shaken completely)
- **Development**: Negligible impact (conditional checks)

---

## Summary

| Context          | Logger       | Output  | Production |
| ---------------- | ------------ | ------- | ---------- |
| API Routes       | `log` (Pino) | JSON    | ✅ Enabled  |
| SSR              | `log` (Pino) | JSON    | ✅ Enabled  |
| React Components | `clientLog`  | Console | ❌ Removed  |
| Build Scripts    | `console`    | Console | ✅ CLI only |

**Result**: Production-ready structured logging with zero client-side overhead! 🚀
