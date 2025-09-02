import { useForm } from "react-hook-form";
import Swal from "sweetalert2";
import Link from "next/link";

export default function AddSchool() {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting },
  } = useForm();

  const onSubmit = async (data) => {
    try {
      const formData = new FormData();
      formData.append("name", data.name);
      formData.append("address", data.address);
      formData.append("city", data.city);
      formData.append("state", data.state);
      formData.append("contact", data.contact);
      formData.append("email_id", data.email_id);

      if (data.image && data.image[0]) {
        formData.append("image", data.image[0]);
      }

      const res = await fetch("/api/schools/add", {
        method: "POST",
        body: formData,
      });

      const json = await res.json();
      if (!res.ok) throw new Error(json.error || "Failed to submit");

      Swal.fire("Success", "School added successfully!", "success");
      reset();
    } catch (e) {
      Swal.fire("Error", e.message, "error");
    }
  };

  return (
    <main className="container py-10">
      <div className="mb-4">
        <h1 className="font-bold text-xl hidden lg:block">Add School</h1>
        <Link href="/" className="text-blue-600 hover:underline lg:hidden">
          ← Back
        </Link>
      </div>
      <div className="card max-w-2xl mx-auto">
        <h1 className="text-xl font-bold mb-4">Add School</h1>
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
          <div>
            <label className="label">School Name</label>
            <input
              className="input"
              placeholder="e.g., Sunrise Public School"
              {...register("name", {
                required: "Name is required",
                minLength: { value: 2, message: "Name too short" },
              })}
            />
            {errors.name && (
              <p className="text-red-600 text-sm mt-1">{errors.name.message}</p>
            )}
          </div>

          <div>
            <label className="label">Address</label>
            <textarea
              className="input"
              rows={3}
              placeholder="Full street address"
              {...register("address", { required: "Address is required" })}
            />
            {errors.address && (
              <p className="text-red-600 text-sm mt-1">
                {errors.address.message}
              </p>
            )}
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="label">City</label>
              <input
                className="input"
                placeholder="City"
                {...register("city", { required: "City is required" })}
              />
              {errors.city && (
                <p className="text-red-600 text-sm mt-1">
                  {errors.city.message}
                </p>
              )}
            </div>
            <div>
              <label className="label">State</label>
              <input
                className="input"
                placeholder="State"
                {...register("state", { required: "State is required" })}
              />
              {errors.state && (
                <p className="text-red-600 text-sm mt-1">
                  {errors.state.message}
                </p>
              )}
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="label">Contact Number</label>
              <input
                className="input"
                placeholder="10-digit number"
                type="tel"
                {...register("contact", {
                  required: "Contact is required",
                  pattern: {
                    value: /^\d{10,15}$/,
                    message: "Enter 10-15 digits",
                  },
                })}
              />
              {errors.contact && (
                <p className="text-red-600 text-sm mt-1">
                  {errors.contact.message}
                </p>
              )}
            </div>
            <div>
              <label className="label">Email</label>
              <input
                className="input"
                placeholder="school@example.com"
                type="email"
                {...register("email_id", {
                  required: "Email is required",
                  pattern: {
                    value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
                    message: "Invalid email",
                  },
                })}
              />
              {errors.email_id && (
                <p className="text-red-600 text-sm mt-1">
                  {errors.email_id.message}
                </p>
              )}
            </div>
          </div>

          <div>
            <label className="label">School Image</label>
            <input
              className="input"
              type="file"
              accept="image/*"
              {...register("image", { required: "Image is required" })}
            />
            {errors.image && (
              <p className="text-red-600 text-sm mt-1">
                {errors.image.message}
              </p>
            )}
            <p className="text-xs text-gray-500 mt-1">
              Accepted: JPG/PNG, up to 5MB.
            </p>
          </div>

          <button className="btn" disabled={isSubmitting} type="submit">
            {isSubmitting ? "Submitting..." : "Add School"}
          </button>
        </form>
      </div>
    </main>
  );
}
