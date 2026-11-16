import { afterEach } from 'vitest';
import { cleanup } from '@testing-library/react';
afterEach(() => { if (typeof document !== 'undefined') cleanup(); });
if (typeof HTMLDialogElement !== 'undefined') {
  HTMLDialogElement.prototype.showModal = function () { this.open = true; };
  HTMLDialogElement.prototype.close = function () { this.open = false; };
}
