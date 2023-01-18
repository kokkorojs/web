# kokkoro-web

Create web serve for kokkoro.

```typescript
import { app } from '@kokkoro/web';

const port = 233;

app.listen(port, () => {
  console.log(`web serve started at http://localhost:${port}`);
});
```
