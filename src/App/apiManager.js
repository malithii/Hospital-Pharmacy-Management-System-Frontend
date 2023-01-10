export const post = (
  path,
  body,
  onSuccess = () => {},
  onFailed = () => {},
  onComplete = () => {}
) => {
  fetch("http://localhost:9000" + path, {
    method: "POST",
    headers: {
      "Content-type": "application/json",
    },
    body: JSON.stringify(body),
  })
    .then((res) => res.json())
    .then((data) => {
      if (data.status === "success") {
        onSuccess(data);
      } else {
        onFailed(data.message);
      }
    })
    .catch((error) => {
      console.log(error);
      onFailed(error);
    })
    .finally(() => {
      onComplete();
    });
};
