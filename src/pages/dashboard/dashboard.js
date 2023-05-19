import { useState } from "react";
import { Tab } from "semantic-ui-react";
import { useRouter } from "next/router";
import { BasicLayout } from "@/layouts";
import { ChatbotGaming } from '@/components/Chatbot';   
import { useAuth } from "@/hooks";
import {
  Games,
  /*   Settings, */
} from "@/components/Dashboard";
import { Separator, Seo } from "@/components/Shared";
import styles from "./dashboard.module.scss";

export default function DasboardPage() {
  const { user, logout } = useAuth();
  const router = useRouter();
  const [reload, setReload] = useState(false);

  if (!user || !user.role) {
    router.push("/");
    return null;
  }

  const onReload = () => setReload((prevState) => !prevState);

  const panes = [
    {
      menuItem: "Games",
      render: () => (
        <Tab.Pane attached={false}>
          <Games.AddGame onReload={onReload} />
          <Games.ListGames reload={reload} onReload={onReload} />
          <Separator height={80} />
        </Tab.Pane>
      ),
    },
    {
      menuItem: { key: 20, icon: "settings", content: "Dashboard" },
      render: () => (
        <Tab.Pane attached={false}>
          <Games.AddGame onReload={onReload} />
          <Games.ListGames reload={reload} onReload={onReload} />
          {/*  <Settings.ChangeNameForm />
          <div className={styles.containerForms}>
            <Settings.ChangeEmailForm />
            <Settings.ChangePasswordForm />
          </div> */}
          <Separator height={80} />
        </Tab.Pane>
      )
    },
    {
      menuItem: {
        key: 21,
        icon: "log out",
        content: "",
        onClick: "",
      },
    },
  ];

  return (
    <>
      <Seo title="Dashboard" />

      <BasicLayout isContainer relative>


        <Tab
          menu={{ secondary: true, pointing: true }}
          panes={panes}
          className={styles.tabs}
        />

        <ChatbotGaming />
      </BasicLayout>
    </>
  );
}


// linea 39 key={99}>