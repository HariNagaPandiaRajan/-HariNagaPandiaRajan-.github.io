// ─── Web3Forms configuration ───
// Get your FREE access key at https://web3forms.com (enter your email → get key)
// Replace the placeholder below with your actual key
const WEB3FORMS_KEY = 'YOUR_ACCESS_KEY_HERE';
const WEB3FORMS_URL = 'https://api.web3forms.com/submit';

export function initContactForm(): void {
  const form = document.getElementById('contact-form') as HTMLFormElement | null;
  const submitBtn = document.getElementById('form-submit') as HTMLButtonElement | null;
  if (!form || !submitBtn) return;

  form.addEventListener('submit', async (e: Event) => {
    e.preventDefault();

    const name = form.querySelector<HTMLInputElement>('[name="name"]');
    const email = form.querySelector<HTMLInputElement>('[name="email"]');
    const company = form.querySelector<HTMLInputElement>('[name="company"]');
    const type = form.querySelector<HTMLSelectElement>('[name="type"]');
    const message = form.querySelector<HTMLTextAreaElement>('[name="message"]');

    // Validate
    let valid = true;

    if (name && !name.value.trim()) {
      showError(name, 'Name is required');
      valid = false;
    } else if (name) {
      clearError(name);
    }

    if (email && !isValidEmail(email.value)) {
      showError(email, 'Valid email is required');
      valid = false;
    } else if (email) {
      clearError(email);
    }

    if (message && !message.value.trim()) {
      showError(message, 'Message is required');
      valid = false;
    } else if (message) {
      clearError(message);
    }

    if (!valid) return;

    // Send
    submitBtn.classList.add('is-loading');
    submitBtn.disabled = true;

    try {
      const payload = {
        access_key: WEB3FORMS_KEY,
        subject: `Portfolio Contact — ${type?.value || 'General'}`,
        from_name: name?.value || '',
        email: email?.value || '',
        company: company?.value || '',
        type: type?.value || '',
        message: message?.value || '',
      };

      const res = await fetch(WEB3FORMS_URL, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
      });

      const data = await res.json();

      if (data.success) {
        submitBtn.classList.remove('is-loading');
        submitBtn.classList.add('is-success');
        form.reset();
        await delay(3000);
        submitBtn.classList.remove('is-success');
      } else {
        throw new Error(data.message || 'Failed to send');
      }
    } catch {
      submitBtn.classList.remove('is-loading');
      alert('Could not send message. Please email harinagapandiarajan@gmail.com directly.');
    } finally {
      submitBtn.disabled = false;
    }
  });

  // Clear errors on input
  form.querySelectorAll<HTMLElement>('.form-input, .form-textarea').forEach((input) => {
    input.addEventListener('input', () => {
      clearError(input as HTMLInputElement);
    });
  });
}

function showError(input: HTMLInputElement | HTMLTextAreaElement, msg: string): void {
  input.classList.add('is-error');
  const el = input.parentElement?.querySelector('.form-error');
  if (el) el.textContent = msg;
}

function clearError(input: HTMLInputElement | HTMLTextAreaElement): void {
  input.classList.remove('is-error');
  const el = input.parentElement?.querySelector('.form-error');
  if (el) el.textContent = '';
}

function isValidEmail(email: string): boolean {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
}

function delay(ms: number): Promise<void> {
  return new Promise((resolve) => setTimeout(resolve, ms));
}
