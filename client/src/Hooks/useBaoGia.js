/** @format */
import { Tag, message } from "antd";
import { useUsers } from "./useUsers";
import axios from "axios";
import { useStorage } from "./useStorage";

const endPoint = "https://65eb419b43ce164189339311.mockapi.io/baogia";

export const useBaoGia = () => {
  const { getCurrUser } = useUsers();
  const { saveToStorage, getFromStorage, removeFromStorage } = useStorage();

  const updateChangeOption = (changeType, newValue, data) => {
    const newData = { ...data };
    newData[changeType] = newValue;
    return newData;
  };

  const findByIdAndKey = (arr, key) => {
    return arr.find((item) => item.value === key);
  };

  const calculateInfo = (data, baogiaOptionArr) => {
    // Validate
    var characterRegex = /^[a-zA-Z' -]+$/;
    var emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    var phoneRegex = /^\d{10}$/;

    const nameErr = data.hoten.length <= 0 || !characterRegex.test(data.hoten);
    const emailErr = data.email.length <= 0 || !emailRegex.test(data.email);
    const ngaydukienErr = data.ngaydukien.length <= 0;
    const tenduanErr = data.tenduan.length <= 0;
    const sdtErr = data.sdt.length <= 0 || !phoneRegex.test(data.sdt);
    const diachiErr = data.diachi.length <= 0;
    const ngansachErr = data.ngansachdukien <= 0;
    const daiErr = data.dientichkhudat <= 0;
    const rongErr = data.dientichxaydung <= 0;
    const tangErr = data.sotang <= 0;
    const loainhaErr = data.loainha.length <= 0;

    if (
      nameErr ||
      emailErr ||
      ngaydukienErr ||
      sdtErr ||
      tenduanErr ||
      daiErr ||
      diachiErr ||
      ngansachErr ||
      rongErr ||
      tangErr ||
      loainhaErr
    ) {
      nameErr && message.error("Tên phải là chữ và không được để trống");
      emailErr && message.error("Email không hợp lệ");
      sdtErr && message.error("Số điện thoại không hợp lệ");

      (ngaydukienErr ||
        loainhaErr ||
        tenduanErr ||
        daiErr ||
        diachiErr ||
        ngansachErr ||
        rongErr ||
        tangErr) &&
        message.error("Bạn vui lòng không để trống phần nào!");
    } else {
      console.log(baogiaOptionArr);
      // const loainha = findByIdAndKey(
      //   baogiaOptionArr[5].options,
      //   data.loainha
      // ).label;
      const hinhthuc = findByIdAndKey(
        baogiaOptionArr[7].options,
        data.hinhthuc
      ).label;
      const sotang = baogiaOptionArr[10].value;
      const loaimong = findByIdAndKey(
        baogiaOptionArr[11].options,
        data.loaimong
      ).label;
      const loaimai = findByIdAndKey(
        baogiaOptionArr[12].options,
        data.loaimai
      ).label;

      const baogiaInfo = {
        ...data,
        // loainha,
        hinhthuc,
        sotang,
        loaimong,
        loaimai,
        status: 0,
        username: getCurrUser() ? getCurrUser().username : null,
        comments: [
          {
            user: "BuildQuote Experts",
            comment: `${
              getCurrUser().username
            } đã tạo dự án, vui lòng chờ nhân viên gửi báo giá`,
            date: new Date().toLocaleString(),
          },
        ],
      };

      return baogiaInfo;
    }
  };

  const handleSaveBaoGia = async (data) => {
    if (data.username) {
      await axios
        .post(endPoint, data)
        .then((res) => {
          message.success("Đã tạo báo giá thành công");
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

  const addComment = async (baogia, comment, user = getCurrUser().username) => {
    const currComment = baogia.comments;

    currComment.push({
      user: user,
      comment: comment,
      date: new Date().toLocaleString(),
    });

    const putSignal = axios
      .put(`${endPoint}/${baogia.id}`, { ...baogia, comments: currComment })
      .then((res) => {
        return 1;
      })
      .catch((err) => {
        return 0;
      });

    return putSignal;
  };

  const getStatus = (status) => {
    switch (status) {
      case 0:
        return <Tag color="yellow">Đang xử lý</Tag>;
      case 1:
        return <Tag color="lime">Đã chấp nhận</Tag>;
      case 2:
        return <Tag color="red">Đã từ chối</Tag>;
      case 3:
        return <Tag color="blue">Đã báo giá</Tag>;
      case 4:
        return <Tag color="volcano">Đã huỷ dự án</Tag>;
    }
  };

  const InteractBaoGia = async (baogia, status, reason = "") => {
    // 0: Đang xử lý, 1: Đã chấp nhận, 2: Đã từ chối, 3: Đã báo giá, 4: Huỷ báo giá
    let comment = "";
    switch (status) {
      // case 0:
      //   comment = "Bắt đầu xử lý báo giá";
      // break;
      case 1:
        comment = `${getCurrUser().username} đã chấp nhận báo giá`;
        break;
      case 2:
        comment = `${getCurrUser().username} đã từ chối báo giá`;
        break;
      case 3:
        comment = "Nhân viên đã báo giá cho dự án";
        break;
      case 4:
        comment = `Nhân viên đã huỷ dự án với lý do: ${reason}`;
        break;
    }

    await addComment(baogia, comment, "BuildQuote Experts");

    baogia.status = status;
    const putSignal = axios
      .put(`${endPoint}/${baogia.id}`, baogia)
      .then((res) => {
        return 1;
      })
      .catch((err) => {
        return 0;
      });

    return putSignal;
  };

  const getAllBaoGia = (setBaoGia, setLoading) => {
    setLoading(true);
    axios
      .get(endPoint)
      .then((res) => {
        const returnedData = res.data;
        const dangxuly = returnedData.filter((data) => data.status === 0);
        const chapnhan = returnedData.filter((data) => data.status === 1);
        const tuchoi = returnedData.filter((data) => data.status === 2);
        const dabaogia = returnedData.filter((data) => data.status === 3);
        const huybaogia = returnedData.filter((data) => data.status === 4);
        setBaoGia([
          ...dangxuly,
          ...dabaogia,
          ...chapnhan,
          ...tuchoi,
          ...huybaogia,
        ]);
      })
      .catch((err) => {
        console.log(err);
      })
      .finally(() => {
        setLoading(false);
      });
  };

  return {
    addComment,
    updateChangeOption,
    calculateInfo,
    handleSaveBaoGia,
    getSavedBaoGia,
    getBaoGiaByCurrUser,
    getBaoGiaByUsername,
    removeBaoGia,
    InteractBaoGia,
    getStatus,
    getAllBaoGia,
  };
};
