import { FC, Fragment, ReactNode, useState } from "react";
import { Content, ContentProps } from "./Content";
import { HeaderSidebar, HeaderSidebarProps } from "./HeaderSidebar";
import { Sidebar } from "./Sidebar";

export interface PageWrapperProps {
  header?: ReactNode;
  footer?: ReactNode;
  children?: ReactNode;
  _header?: Partial<HeaderSidebarProps>;
  _content?: Partial<ContentProps>;
  decoration?: JSX.Element;
  withSidebar?: boolean;
  dashboardTitle?: string;
}

export const PageWrapper: FC<PageWrapperProps> = ({
  children,
  header,
  footer,
  decoration,
  withSidebar,
  dashboardTitle,
  ...props
}) => {
  const [sidebarOpen, setSidebarOpen] = useState(false);

  return (
    <Fragment>
      {(header || withSidebar) && (
        <HeaderSidebar
          {...props._header}
          menuOpen={sidebarOpen}
          onMenuChange={(open) => setSidebarOpen(open)}
        />
      )}
      <Content
        {...props._content}
        className={`${props._content?.className || ""} ${
          !!decoration ? "relative overflow-hidden" : ""
        }`}
      >
        {decoration}
        {withSidebar ? (
          <div className="flex flex-col md:flex-row">
            <div>
              <Sidebar hide={!sidebarOpen} />
            </div>
            <div className="flex-1 min-h-screen bg-slate-100">
              {!!dashboardTitle && (
                <div className="py-5 px-8">
                  <p className="text-xl opacity-70 uppercase">
                    {dashboardTitle}
                  </p>
                </div>
              )}
              {children}
            </div>
          </div>
        ) : (
          children
        )}
      </Content>
    </Fragment>
  );
};
