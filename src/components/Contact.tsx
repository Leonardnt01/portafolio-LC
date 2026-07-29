import { AlertCircle, CheckCircle2, Loader2, Mail, MapPin, Send } from 'lucide-react';
import { useState } from 'react';
import { contact } from '../data/portfolio';
import SectionHeading from './SectionHeading';

/**
 * Clave publica de Web3Forms. Se define en `.env` como PUBLIC_WEB3FORMS_KEY.
 * Es publica por diseno: solo permite enviar al correo asociado a la cuenta.
 */
const ACCESS_KEY = import.meta.env.PUBLIC_WEB3FORMS_KEY as string | undefined;

type Status = 'idle' | 'sending' | 'sent' | 'error';

export default function Contact() {
  const [status, setStatus] = useState<Status>('idle');
  const [errorMessage, setErrorMessage] = useState('');

  // Recibe el formulario directamente: el tipo del evento lo infiere JSX.
  const submitForm = async (form: HTMLFormElement) => {
    if (!ACCESS_KEY) {
      setStatus('error');
      setErrorMessage(
        'El formulario aún no está configurado. Escríbeme directamente por correo mientras tanto.',
      );
      return;
    }

    setStatus('sending');
    setErrorMessage('');

    try {
      const response = await fetch('https://api.web3forms.com/submit', {
        method: 'POST',
        headers: { Accept: 'application/json' },
        body: new FormData(form),
      });
      const result = await response.json();

      if (!response.ok || !result.success) {
        throw new Error(result.message ?? 'La solicitud fue rechazada.');
      }

      form.reset();
      setStatus('sent');
      window.setTimeout(() => setStatus('idle'), 6000);
    } catch {
      // No exponemos el detalle tecnico: le damos una via alternativa util.
      setStatus('error');
      setErrorMessage('No se pudo enviar el mensaje. Inténtalo de nuevo o escríbeme por correo.');
    }
  };

  const isSending = status === 'sending';

  return (
    <section className="contact-section reveal-section" id="contact">
      <div className="section-shell contact-layout">
        <div className="contact-copy">
          <SectionHeading kicker="Contacto" title="Hablemos de tu proyecto" />
          <p>
            ¿Tienes una idea en mente, una oportunidad o simplemente quieres conversar sobre
            tecnología? Envíame un mensaje y construyamos algo valioso.
          </p>
          <div className="contact-details">
            <a href={`mailto:${contact.email}`}>
              <Mail size={19} aria-hidden="true" />
              {contact.email}
            </a>
            <span>
              <MapPin size={19} aria-hidden="true" />
              {contact.location}
            </span>
          </div>
        </div>

        <form
          className="contact-form"
          onSubmit={(event) => {
            event.preventDefault();
            void submitForm(event.currentTarget);
          }}
        >
          <input type="hidden" name="access_key" value={ACCESS_KEY ?? ''} />
          <input type="hidden" name="subject" value="Nuevo mensaje desde el portafolio" />
          <input type="hidden" name="from_name" value="Portafolio Leonardo Condori" />
          {/* Honeypot: invisible para personas, tentador para bots. */}
          <input
            className="sr-only"
            name="botcheck"
            style={{ display: 'none' }}
            tabIndex={-1}
            type="checkbox"
          />

          <div className="form-row">
            <label>
              <span>Nombre completo</span>
              <input name="name" type="text" placeholder="Tu nombre" autoComplete="name" required />
            </label>
            <label>
              <span>Correo electrónico</span>
              <input
                name="email"
                type="email"
                placeholder="hola@ejemplo.com"
                autoComplete="email"
                required
              />
            </label>
          </div>
          <label>
            <span>Asunto</span>
            <input name="user_subject" type="text" placeholder="¿Cómo puedo ayudarte?" required />
          </label>
          <label>
            <span>Mensaje</span>
            <textarea name="message" placeholder="Escribe tu mensaje aquí..." rows={5} required />
          </label>

          <button className="primary-button" type="submit" disabled={isSending}>
            {isSending ? (
              <Loader2 className="spin" size={18} aria-hidden="true" />
            ) : (
              <Send size={18} aria-hidden="true" />
            )}
            {isSending ? 'Enviando...' : 'Enviar mensaje'}
          </button>

          <p
            className={`form-status ${status === 'sent' || status === 'error' ? 'visible' : ''} ${
              status === 'error' ? 'form-status-error' : ''
            }`}
            aria-live="polite"
            role={status === 'error' ? 'alert' : undefined}
          >
            {status === 'error' ? (
              <>
                <AlertCircle size={18} aria-hidden="true" />
                {errorMessage}
              </>
            ) : (
              <>
                <CheckCircle2 size={18} aria-hidden="true" />
                Mensaje enviado. Te responderé lo antes posible.
              </>
            )}
          </p>
        </form>
      </div>
    </section>
  );
}
