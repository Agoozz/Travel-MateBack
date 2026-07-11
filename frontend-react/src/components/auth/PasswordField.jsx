import { useState } from 'react';

export default function PasswordField({ id, placeholder, value, onChange, minLength, required }) {
  const [show, setShow] = useState(false);

  return (
    <div className="input-group rounded-pill overflow-hidden border border-secondary-subtle">
      <input
        type={show ? "text" : "password"}
        id={id}
        className="form-control border-0 px-3 py-2 shadow-none small"
        placeholder={placeholder}
        value={value}
        onChange={onChange}
        required={required}
        minLength={minLength}
      />
      <button
        className="btn btn-link bg-body text-body-secondary border-0 px-3 d-flex align-items-center"
        type="button"
        onClick={() => setShow(!show)}
        tabIndex="-1"
      >
        <i className={show ? "bi bi-eye-fill" : "bi bi-eye-slash-fill"}></i>
      </button>
    </div>
  );
}
