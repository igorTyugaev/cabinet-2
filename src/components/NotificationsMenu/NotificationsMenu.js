import React, { useEffect } from "react";
import { useHistory } from "react-router-dom";
import classNames from "classnames";
import ListNotifications from "../ListNotifications";
import IonIcon from "../IonIcon";
import { useLazyGetNotificationsQuery } from "../../api/endpoints/NotificationsApi";
import cn from "./NotificationsMenu.module.scss";

const NotificationsMenu = ({ open, setOpen }) => {
  const [trigger, { data, error, isLoading }] = useLazyGetNotificationsQuery();
  const history = useHistory();

  useEffect(() => {
    if (open && trigger) trigger();
  }, [open]);

  function handleShowHistory() {
    history.push("/notifications");
    setOpen && setOpen(false);
  }

  function handleClose() {
    setOpen && setOpen(false);
  }

  return (
    <div className={classNames(cn.Container)}>
      <div className={classNames(cn.Header)}>
        <p className="text text_weight_bold">
          Последние уведомления
        </p>
        <IonIcon className={classNames(cn.CloseBtn)} name="close" onClick={handleClose} />
      </div>
      <div className={classNames(cn.List)}>
        <ListNotifications isLoading={isLoading} error={error} data={data} />
      </div>
      <button className={classNames(cn.ShowHistoryBtn, "link")} onClick={handleShowHistory}>
        Перейти к истории уведомлений
      </button>
    </div>
  );
};


export default NotificationsMenu;
