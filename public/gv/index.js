// show alert
const showAlert = document.querySelector("[show-alert]");
if (showAlert) {
    const closeAlert = showAlert.querySelector("[close-alert]")
    const time = parseInt(showAlert.getAttribute("data-time"));
    setTimeout(() => {
        showAlert.classList.add("alert-hidden");
    }, time)
    closeAlert.addEventListener("click", () => {
        showAlert.classList.add("alert-hidden");
    })
}
// end

document.addEventListener("DOMContentLoaded", () => {
    document.querySelectorAll(".btn-edit").forEach(btn => {
        btn.addEventListener("click", () => {
            const tr = btn.closest("tr");

            tr.querySelectorAll(".view").forEach(el => el.style.display = "none");
            tr.querySelectorAll(".edit").forEach(el => el.style.display = "inline");

            btn.style.display = "none";
            tr.querySelector(".btn-save").style.display = "inline";
            tr.querySelector(".btn-cancel").style.display = "inline";
        });
    });
    document.querySelectorAll(".btn-save").forEach(btn => {
        btn.addEventListener("click", async () => {
            const tr = btn.closest("tr");
            const inputs = tr.querySelectorAll(".edit");

            const id = tr.dataset.id;
            const masv = tr.dataset.masv;

            const data = {
                cc1: inputs[0].value,
                cc2: inputs[1].value,
                th1: inputs[2].value,
                th2: inputs[3].value
            };

            try {
                const res = await fetch(`/gv/edit/${id}/${masv}`, {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json"
                    },
                    body: JSON.stringify(data)
                });

                const result = await res.json();

                if (result.success) {
                    location.reload();
                } else {
                    alert("Cập nhật thất bại");
                }

            } catch (err) {
                console.error(err);
                alert("Lỗi server");
            }
        });
    });

    document.querySelectorAll(".btn-cancel").forEach(btn => {
        btn.addEventListener("click", () => {
            const tr = btn.closest("tr");


            const views = tr.querySelectorAll(".view");
            const inputs = tr.querySelectorAll(".edit");

            inputs.forEach((input, index) => {
                input.value = views[index].innerText;
            });


            tr.querySelectorAll(".view").forEach(el => el.style.display = "inline");
            tr.querySelectorAll(".edit").forEach(el => el.style.display = "none");


            tr.querySelector(".btn-edit").style.display = "inline";
            tr.querySelector(".btn-save").style.display = "none";
            tr.querySelector(".btn-cancel").style.display = "none";
        });
    });

});