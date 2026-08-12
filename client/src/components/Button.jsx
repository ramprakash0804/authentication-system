function Button({
    children,
    type = "button",
    loading = false,
    disabled = false
}) {
    return (
        <button
            type={type}
            className="primary-button"
            disabled={disabled || loading}
        >
            {loading ? "Please wait..." : children}
        </button>
    );
}

export default Button;