import workerUrl from 'pdfjs-dist/build/pdf.worker.min.mjs?url';
import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest';

describe('PDF worker deployment path', () => {
  beforeEach(() => {
    vi.resetModules();
  });

  afterEach(() => {
    document.querySelector('meta[property="og:root_path"]')?.remove();
  });

  it.each(['', '/spec_bot', '/apps/assistant'])(
    'loads the PDF worker under the app root %j',
    async (rootPath) => {
      const meta = document.createElement('meta');
      meta.setAttribute('property', 'og:root_path');
      meta.setAttribute('content', rootPath);
      document.head.appendChild(meta);

      await import('../src/components/Elements/PDF');
      const { pdfjs } = await import('react-pdf');

      expect(pdfjs.GlobalWorkerOptions.workerSrc).toBe(
        `${rootPath}${workerUrl}`
      );
    }
  );
});
