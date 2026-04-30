import { useTranslation } from "react-i18next";

export default function InvestmentPage(){
    const { t } = useTranslation();

    return(
        <div>
            <h1>{t('pages.investments')}</h1>
        </div>
    )
}
