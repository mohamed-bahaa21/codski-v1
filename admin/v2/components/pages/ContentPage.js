import React, { useState } from 'react';
import { useRouter } from 'next/router';
import Page from 'components/layout/Page';
import MenuLayout from 'components/layout/MenuLayout';
import CSections from './CSections';
import { useSelector } from 'react-redux';
import { FormattedMessage } from 'react-intl';
import CSection from 'components/forms/CSection';

import index from 'data/sections';

const SECTIONS = '/content/landing';
const HERO_SECTION = '/content/landing/hero_section';
const LD1_SECTION = '/content/landing/ld1_section';
const LI1_SECTION = '/content/landing/li1_section';
const LD2_SECTION = '/content/landing/ld2_section';
const LI3_SECTION = '/content/landing/li3_section';
const LI2_SECTION = '/content/landing/li2_section';
const WV_SECTION = '/content/landing/wv_section';
const SS_SECTION = '/content/landing/ss_section';
const LD3_SECTION = '/content/landing/ld3_section';
const PI_SECTION = '/content/landing/pi_section';
const TI_SECTION = '/content/landing/ti_section';

export default function ContentPage() {
  const user = useSelector(state => state.user);
  const [option, setOption] = useState(SECTIONS);
  const router = useRouter();
  const { pathname } = router;

  const menuOptions = [
    // { label: <FormattedMessage id="label.sections" defaultMessage="Sections" />, value: SECTIONS },
    { label: <FormattedMessage id="label.hero_section" defaultMessage="Hero Section" />, value: HERO_SECTION },
    { label: <FormattedMessage id="label.ld1_section" defaultMessage="Lens Design 1" />, value: LD1_SECTION },
    { label: <FormattedMessage id="label.li1_section" defaultMessage="Lens Info 1" />, value: LI1_SECTION },
    { label: <FormattedMessage id="label.ld2_section" defaultMessage="Lens Design 2" />, value: LD2_SECTION },
    { label: <FormattedMessage id="label.li3_section" defaultMessage="Lens Info 3" />, value: LI3_SECTION },
    { label: <FormattedMessage id="label.li2_section" defaultMessage="Lens Info 2" />, value: LI2_SECTION },
    { label: <FormattedMessage id="label.wv_section" defaultMessage="Watch Video" />, value: WV_SECTION },
    { label: <FormattedMessage id="label.ss_section" defaultMessage="Sample Sample" />, value: SS_SECTION },
    { label: <FormattedMessage id="label.ld3_section" defaultMessage="Lens Design 3" />, value: LD3_SECTION },
    { label: <FormattedMessage id="label.pi_section" defaultMessage="Production Info" />, value: PI_SECTION },
    { label: <FormattedMessage id="label.ti_section" defaultMessage="Technical Info" />, value: TI_SECTION },
  ];

  return (
    <Page>
      <MenuLayout menu={menuOptions} selectedOption={option} onMenuSelect={setOption}>
        {/* {pathname === SECTIONS && <CSections />} */}
        {pathname === HERO_SECTION && (
          <CSection
            sectionHeader="Hero Section"
            sectionHeaderID="hero"
            sectionID={index.hero.sectionID}
            formFieldsName={index.hero.formFieldsName}
            formFields={index.hero.formFields}
            formFieldsType={index.hero.formFieldsType}
            init_formFieldsValues={index.hero.init_formFieldsValues}
            getLink={index.hero.getLink}
            postLink={index.hero.postLink}
          />
        )}
        {pathname === LD1_SECTION && (
          <CSection
            sectionHeader="Lens Design 1"
            sectionHeaderID="ld1"
            sectionID={index.ld1.sectionID}
            formFieldsName={index.ld1.formFieldsName}
            formFields={index.ld1.formFields}
            formFieldsType={index.ld1.formFieldsType}
            init_formFieldsValues={index.ld1.init_formFieldsValues}
            getLink={index.ld1.getLink}
            postLink={index.ld1.postLink}
          />
        )}
        {pathname === LI1_SECTION && (
          <CSection
            sectionHeader="Lens Info 1"
            sectionHeaderID="li1"
            sectionID={index.li1.sectionID}
            formFieldsName={index.li1.formFieldsName}
            formFields={index.li1.formFields}
            formFieldsType={index.li1.formFieldsType}
            init_formFieldsValues={index.li1.init_formFieldsValues}
            getLink={index.li1.getLink}
            postLink={index.li1.postLink}
          />
        )}
        {pathname === LD2_SECTION && (
          <CSection
            sectionHeader="Lens Design 2"
            sectionHeaderID="ld2"
            sectionID={index.ld2.sectionID}
            formFieldsName={index.ld2.formFieldsName}
            formFields={index.ld2.formFields}
            formFieldsType={index.ld2.formFieldsType}
            init_formFieldsValues={index.ld2.init_formFieldsValues}
            getLink={index.ld2.getLink}
            postLink={index.ld2.postLink}
          />
        )}
        {pathname === LI3_SECTION && (
          <CSection
            sectionHeader="LI3_SECTION"
            sectionHeaderID="li3"
            sectionID={index.li3.sectionID}
            formFieldsName={index.li3.formFieldsName}
            formFields={index.li3.formFields}
            formFieldsType={index.li3.formFieldsType}
            init_formFieldsValues={index.li3.init_formFieldsValues}
            getLink={index.li3.getLink}
            postLink={index.li3.postLink}
          />
        )}
        {pathname === LI2_SECTION && (
          <CSection
            sectionHeader="LI2_SECTION"
            sectionHeaderID="li2"
            sectionID={index.li2.sectionID}
            formFieldsName={index.li2.formFieldsName}
            formFields={index.li2.formFields}
            formFieldsType={index.li2.formFieldsType}
            init_formFieldsValues={index.li2.init_formFieldsValues}
            getLink={index.li2.getLink}
            postLink={index.li2.postLink}
          />
        )}
        {pathname === WV_SECTION && (
          <CSection
            sectionHeader="WV_SECTION"
            sectionHeaderID="wv"
            sectionID={index.wv.sectionID}
            formFieldsName={index.wv.formFieldsName}
            formFields={index.wv.formFields}
            formFieldsType={index.wv.formFieldsType}
            init_formFieldsValues={index.wv.init_formFieldsValues}
            getLink={index.wv.getLink}
            postLink={index.wv.postLink}
          />
        )}
        {pathname === SS_SECTION && (
          <CSection
            sectionHeader="SS_SECTION"
            sectionHeaderID="ss"
            sectionID={index.ss.sectionID}
            formFieldsName={index.ss.formFieldsName}
            formFields={index.ss.formFields}
            formFieldsType={index.ss.formFieldsType}
            init_formFieldsValues={index.ss.init_formFieldsValues}
            getLink={index.ss.getLink}
            postLink={index.ss.postLink}
          />
        )}
        {pathname === LD3_SECTION && (
          <CSection
            sectionHeader="LD3_SECTION"
            sectionHeaderID="ld3"
            sectionID={index.ld3.sectionID}
            formFieldsName={index.ld3.formFieldsName}
            formFields={index.ld3.formFields}
            formFieldsType={index.ld3.formFieldsType}
            init_formFieldsValues={index.ld3.init_formFieldsValues}
            getLink={index.ld3.getLink}
            postLink={index.ld3.postLink}
          />
        )}
        {pathname === PI_SECTION && (
          <CSection
            sectionHeader="PI_SECTION"
            sectionHeaderID="pi"
            sectionID={index.pi.sectionID}
            formFieldsName={index.pi.formFieldsName}
            formFields={index.pi.formFields}
            formFieldsType={index.pi.formFieldsType}
            init_formFieldsValues={index.pi.init_formFieldsValues}
            getLink={index.pi.getLink}
            postLink={index.pi.postLink}
          />
        )}
        {pathname === TI_SECTION && (
          <CSection
            sectionHeader="TI_SECTION"
            sectionHeaderID="ti"
            sectionID={index.ti.sectionID}
            formFieldsName={index.ti.formFieldsName}
            formFields={index.ti.formFields}
            formFieldsType={index.ti.formFieldsType}
            init_formFieldsValues={index.ti.init_formFieldsValues}
            getLink={index.ti.getLink}
            postLink={index.ti.postLink}
          />
        )}
      </MenuLayout>
    </Page>
  );
}
