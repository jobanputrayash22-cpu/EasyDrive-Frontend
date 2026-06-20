import { useState } from "react";
import Swal from "sweetalert2";

export default function ReviewPage() {
  const [rating, setRating] =
    useState(5);

  const [comment, setComment] =
    useState("");

  const submitReview = async () => {
    if (!comment.trim()) {
      Swal.fire({
        title: "Warning",
        text: "Please write your review",
        icon: "warning"
      });
      return;
    }

    try {
      const res = await fetch(
        "http://localhost:5194/api/Reviews",
        {
          method: "POST",
          headers: {
            "Content-Type":
              "application/json"
          },
          body: JSON.stringify({
            userId:
              localStorage.getItem(
                "userId"
              ) || 1,

            carId: 1,
            rating,
            comment
          })
        }
      );

      if (!res.ok) {
        Swal.fire({
          title: "Error",
          text: "Failed to submit review",
          icon: "error"
        });
        return;
      }

      Swal.fire({
        title:
          "Review submitted successfully! ⭐",
        icon: "success",
        timer: 1200,
        showConfirmButton: false
      });

      setComment("");
      setRating(5);
    } catch {
      Swal.fire({
        title: "Error",
        text:
          "Server error while submitting review",
        icon: "error"
      });
    }
  };


  return (
    <div style={page}>
      <h1>Rate Your Ride</h1>

      <select
        value={rating}
        onChange={(e) =>
          setRating(
            Number(
              e.target.value
            )
          )
        }
        style={input}
      >
        <option value={5}>
          ⭐⭐⭐⭐⭐
        </option>

        <option value={4}>
          ⭐⭐⭐⭐
        </option>

        <option value={3}>
          ⭐⭐⭐
        </option>

        <option value={2}>
          ⭐⭐
        </option>

        <option value={1}>
          ⭐
        </option>
      </select>

      <textarea
        placeholder="Write review..."
        value={comment}
        onChange={(e) =>
          setComment(
            e.target.value
          )
        }
        style={input}
      />

      <button
        style={btn}
        onClick={submitReview}
      >
        Submit Review
      </button>
    </div>
  );
}

const page = {
  padding: "30px",
  background: "#05070f",
  minHeight: "100vh",
  color: "white"
};

const input = {
  width: "100%",
  padding: "14px",
  marginBottom: "20px",
  borderRadius: "12px",
  border: "none"
};

const btn = {
  padding: "14px 24px",
  border: "none",
  borderRadius: "12px",
  background: "#d4b06a",
  fontWeight: "700",
  cursor: "pointer"
};