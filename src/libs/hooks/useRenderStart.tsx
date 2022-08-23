// FIXME:
/* eslint-disable no-console */

import { getDownloadURL, ref, uploadBytesResumable } from "firebase/storage";
import { useSelector } from "react-redux";
import { storage } from "src/libs/firebase/front";
import { RenderInfo } from "src/libs/firebase/server";
import { FirstPageState, selectAllFirstPageData } from "src/store/features/firstPageSlice";

export const useRender = () => {
  const useRenderStart = async () => {
    const firstPageData = useSelector(selectAllFirstPageData);
    const { title, imageUrl } = firstPageData;

    const res = await fetch(imageUrl);
    const blob = await res.blob();
    const storageRed = ref(storage, "images");
    const uploadTask = uploadBytesResumable(storageRed, blob);
    uploadTask.on(
      "state_changed",
      (snapshot) => {
        const prog = Math.round((snapshot.bytesTransferred / snapshot.totalBytes) * 100);
      },
      (err) => console.log(err)
    );
    const downloadUrl = await getDownloadURL(uploadTask.snapshot.ref);
    console.log({ downloadUrl });

    const formData: FirstPageState = {
      title,
      imageUrl: downloadUrl,
    };
    const renderStartRes = await fetch("/api/render", {
      method: "POST",
      body: JSON.stringify(formData),
    });
    // FIXME: アサーション削除
    const renderInfo = (await renderStartRes.json()) as RenderInfo;
    return renderInfo;
  };

  return { useRenderStart };
};
