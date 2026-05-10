export default function Input({ label, id, placeholder, type }) {
    return (
        <div className="">
            <label className="text-gray-700 text-sm font-bold mb-2">{label}</label>
            <input
                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 
                            leading-tight focus:outline-blue-400 focus:shadow-outline"
                placeholder={placeholder}
                id={id}
                type={type}
            />
        </div>
    );
}
