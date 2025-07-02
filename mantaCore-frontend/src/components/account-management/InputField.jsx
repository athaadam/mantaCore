// components/form/InputField.jsx
export default function InputField({ name, type = "text", value, onChange, placeholder, required }) {
    return (
        <input
            name={name}
            type={type}
            value={value}
            onChange={onChange}
            placeholder={placeholder}
            required={required}
            className="flex-1 px-4 py-2 border rounded"
        />
    );
}