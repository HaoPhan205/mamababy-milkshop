/** @format */
import { message } from "antd";
import { useUsers } from "./useUsers";
import axios from "axios";
import { useStorage } from "./useStorage";

const endPoint = "https://65efe5b4ead08fa78a512946.mockapi.io/baogia";

export const useBaoGiadukien = () => {
  const { getCurrUser } = useUsers();
  const { saveToStorage, getFromStorage, removeFromStorage } = useStorage();

  const updateChangeOption = (changeType, newValue, data) => {
    switch (changeType) {
      case "loainha":
        return { ...data, loainha: newValue };
      case "hinhthuc":
        return { ...data, hinhthuc: newValue };
      case "dai":
        return { ...data, dai: Number(newValue) };
      case "rong":
        return { ...data, rong: Number(newValue) };
      case "sotang":
        return { ...data, sotang: Number(newValue) };
      case "loaimong":
        return { ...data, loaimong: newValue };
      case "loaimai":
        return { ...data, loaimai: newValue };
      default:
        return;
    }
  };

  const findByIdAndKey = (arr, key) => {
    return arr.find((item) => item.value === key);
  };

  const calculateInfo = (data, baogiaOptionArr) => {
    const daiErr = data.dai <= 0;
    const rongErr = data.rong <= 0;
    const tangErr = data.sotang <= 0;

    if (daiErr || rongErr || tangErr) {
      console.log(data);
      message.error("Chiều dài, chiều rộng và số tầng phải lớn hơn 0");
    } else {
      const dientichtang = data.dai * data.rong;
      const mong = (data.dai * data.rong) / 2;
      const mai = (data.dai + data.rong) * 2;
      const tongdientich = dientichtang * data.sotang + mong + mai;
      const dongia = 3400000;
      const loainha = findByIdAndKey(
        baogiaOptionArr[0].options,
        data.loainha
      ).label;
      const hinhthuc = findByIdAndKey(
        baogiaOptionArr[1].options,
        data.hinhthuc
      ).label;
      const sotang = data.sotang;
      const loaimong = findByIdAndKey(
        baogiaOptionArr[5].options,
        data.loaimong
      ).label;
      const loaimai = findByIdAndKey(
        baogiaOptionArr[6].options,
        data.loaimai
      ).label;

      const baogiaInfo = {
        loainha,
        hinhthuc,
        sotang,
        loaimong,
        loaimai,
        dai: data.dai,
        rong: data.rong,
        dientichtang: dientichtang,
        mong: mong,
        mai: mai,
        tongdientich: tongdientich,
        dongia: dongia,
        tongtien: dongia * tongdientich,
        username: getCurrUser() ? getCurrUser().username : null,
      };

      console.log(baogiaInfo);
      return baogiaInfo;
    }
  };

  const handleSaveBaoGia = async (data) => {
    if (data.username) {
      await axios
        .post(endPoint, data)
        .then((res) => {
          message.success("Lưu thành công");
          removeFromStorage("baogia");
        })
        .catch((err) => console.log(err));
    } else {
      saveToStorage("baogia", data);
      message.error("Bạn cần đăng nhập trước để lưu");
    }
  };

  const getSavedBaoGia = () => {
    const dataFromStorage = getFromStorage("baogia");
    if (!dataFromStorage) {
      return null;
    }
    if (!dataFromStorage.username && getCurrUser()) {
      dataFromStorage.username = getCurrUser().username;
    }
    return dataFromStorage ? dataFromStorage : null;
  };

  const getBaoGiaByCurrUser = (setOldBaoGiaData) => {
    if (getCurrUser()) {
      axios
        .get(`${endPoint}?username=${getCurrUser().username}`)
        .then((res) => {
          setOldBaoGiaData(res.data);
        })
        .catch((err) => {
          console.log(err);
          setOldBaoGiaData([]);
        });
    }
  };

  const getBaoGiaByUsername = async (username) => {
    let returnedData = null;
    await axios
      .get(`${endPoint}?username=${username}`)
      .then((res) => {
        returnedData = res.data;
      })
      .catch((err) => {
        console.log(err);
      });

    return returnedData;
  };

  const removeBaoGia = async (id) => {
    await axios
      .delete(`${endPoint}/${id}`)
      .then((res) => {
        message.success("Đã xoá báo giá");
      })
      .catch((err) => console.log(err));
  };

  return {
    updateChangeOption,
    calculateInfo,
    handleSaveBaoGia,
    getSavedBaoGia,
    getBaoGiaByCurrUser,
    getBaoGiaByUsername,
    removeBaoGia,
  };
};
