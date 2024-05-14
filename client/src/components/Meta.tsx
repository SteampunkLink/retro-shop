import { Helmet } from "react-helmet-async";

interface MetaProps {
  title: string;
  description: string;
  keywords: string;
}

const Meta = ({ title, description, keywords }: MetaProps) => {
  return (
    <Helmet>
      <title>{title}</title>
      <meta name="description" content={description} />
      <meta name="keywords" content={keywords} />
    </Helmet>
  );
};

Meta.defaultProps = {
  title: "Welcome to Retro Shop!",
  description: "Relive your childhood here!",
  keywords: "toys, cards, retro, buy retro toys, 90s toys",
};

export default Meta;
