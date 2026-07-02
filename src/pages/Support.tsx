import PageHero from "../components/common/PageHero";
import SectionBlock from "../components/common/SectionBlock";
import SubNav from "../components/navigation/SubNav";
import { subNavItems } from "../data/subNavData";

function Support() {
  return (
    <div className="page page--support">
      <PageHero title="고객지원" />
      <SubNav items={subNavItems.support} />
      {subNavItems.support.map((item) => (
        <SectionBlock key={item.id} id={item.id} title={item.label} />
      ))}
    </div>
  );
}

export default Support;
