import {
  IonBackButton,
  IonButton,
  IonButtons,
  IonContent,
  IonHeader,
  IonMenuButton,
  IonPage,
  IonTitle,
  IonToolbar,
} from "@ionic/react";
import PageTitle from "./PageTitle";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { IconProp } from "@fortawesome/fontawesome-svg-core";

type Button = {
  icon: IconProp;
  onClick: () => void;
};

type PageProps = {
  title?: string;
  children?: any;
  buttons?: Button[];
  show_header?: boolean;
};

function Page({
  title,
  children,
  buttons = [],
  show_header = true,
}: PageProps) {
  return (
    <>
      <PageTitle title={title} />
      <IonPage>
        {show_header && (
          <IonHeader>
            <IonToolbar>
              <IonButtons slot="start">
                <IonMenuButton />
                <IonBackButton />
              </IonButtons>
              <IonTitle>{title}</IonTitle>
              {buttons && (
                <IonButtons slot="end">
                  {buttons.map((button: any, index: number) => {
                    return (
                      <IonButton
                        key={index}
                        className="ion-button"
                        onClick={button.onClick}
                      >
                        {button.icon && (
                          <FontAwesomeIcon
                            icon={button.icon}
                            className="ion-icon"
                          />
                        )}
                      </IonButton>
                    );
                  })}
                </IonButtons>
              )}
            </IonToolbar>
          </IonHeader>
        )}
        <IonContent fullscreen>
          {show_header && (
            <IonHeader collapse="condense">
              <IonToolbar>
                <IonTitle size="large">{title}</IonTitle>
              </IonToolbar>
            </IonHeader>
          )}
          {children}
        </IonContent>
      </IonPage>
    </>
  );
}

export default Page;
