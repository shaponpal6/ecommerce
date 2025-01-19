// Next Imports
import { useParams } from 'next/navigation'

// MUI Imports
import { useTheme } from '@mui/material/styles'
import Chip from '@mui/material/Chip'

// Third-party Imports
import PerfectScrollbar from 'react-perfect-scrollbar'

// Type Imports
import type { getDictionary } from '@/utils/getDictionary'
import type { VerticalMenuContextProps } from '@menu/components/vertical-menu/Menu'

// Component Imports
import { Menu, SubMenu, MenuItem, MenuSection } from '@menu/vertical-menu'

// import { GenerateVerticalMenu } from '@components/GenerateMenu'

// Hook Imports
import useVerticalNav from '@menu/hooks/useVerticalNav'

// Styled Component Imports
import StyledVerticalNavExpandIcon from '@menu/styles/vertical/StyledVerticalNavExpandIcon'

// Style Imports
import menuItemStyles from '@core/styles/vertical/menuItemStyles'
import menuSectionStyles from '@core/styles/vertical/menuSectionStyles'

// Menu Data Imports
// import menuData from '@/data/navigation/verticalMenuData'

type RenderExpandIconProps = {
  open?: boolean
  transitionDuration?: VerticalMenuContextProps['transitionDuration']
}

type Props = {
  dictionary: Awaited<ReturnType<typeof getDictionary>>
  scrollMenu: (container: any, isPerfectScrollbar: boolean) => void
}

const RenderExpandIcon = ({ open, transitionDuration }: RenderExpandIconProps) => (
  <StyledVerticalNavExpandIcon open={open} transitionDuration={transitionDuration}>
    <i className='ri-arrow-right-s-line' />
  </StyledVerticalNavExpandIcon>
)

const EcommerceVerticalMenu = ({ dictionary, scrollMenu }: Props) => {
  // Hooks
  const theme = useTheme()
  const verticalNavOptions = useVerticalNav()
  const params = useParams()

  // Vars
  const { isBreakpointReached, transitionDuration } = verticalNavOptions
  const { lang: locale } = params

  const ScrollWrapper = isBreakpointReached ? 'div' : PerfectScrollbar

  return (
    // eslint-disable-next-line lines-around-comment
    /* Custom scrollbar instead of browser scroll, remove if you want browser scroll only */
    <ScrollWrapper
      {...(isBreakpointReached
        ? {
          className: 'bs-full overflow-y-auto overflow-x-hidden',
          onScroll: container => scrollMenu(container, false)
        }
        : {
          options: { wheelPropagation: false, suppressScrollX: true },
          onScrollY: container => scrollMenu(container, true)
        })}
    >
      {/* Incase you also want to scroll NavHeader to scroll with Vertical Menu, remove NavHeader from above and paste it below this comment */}
      {/* Vertical Menu */}
      <Menu
        popoutMenuOffset={{ mainAxis: 17 }}
        menuItemStyles={menuItemStyles(verticalNavOptions, theme)}
        renderExpandIcon={({ open }) => <RenderExpandIcon open={open} transitionDuration={transitionDuration} />}
        renderExpandedMenuItemIcon={{ icon: <i className='ri-circle-fill' /> }}
        menuSectionStyles={menuSectionStyles(verticalNavOptions, theme)}
      >

        <SubMenu
          label={dictionary['navigation'].dashboards}
          icon={<i className='ri-home-smile-line' />}
          suffix={<Chip label='5' size='small' color='error' />}
        >
          <MenuItem href={`/${locale}/dashboards/ecommerce`}>Sales Dashboard</MenuItem>
          <MenuItem href={`/${locale}/dashboards/logistics`}>Order Management Dashboard</MenuItem>
          <MenuItem href={`/${locale}/dashboards/crm`}>Retail/Store Performance Dashboard</MenuItem>
          <MenuItem href={`/${locale}/dashboards/analytics`}>Marketing Dashboard</MenuItem>
          {/* <MenuItem href={`/${locale}/dashboards/academy`}>{dictionary['navigation'].academy}</MenuItem> */}
          {/* <MenuItem href={`/${locale}/charts/apex-charts`}>{dictionary['navigation'].apex}</MenuItem> */}
          {/* <MenuItem href={`/${locale}/charts/recharts`}>{dictionary['navigation'].recharts}</MenuItem> */}

        </SubMenu>




        {/* Products  */}
        {/* <MenuSection label={dictionary['navigation'].products}> */}
        <SubMenu label={dictionary['navigation'].products} icon={<i className='ri-home-smile-line' />}>
          <MenuItem href={`/${locale}/apps/ecommerce/products/add`}>Add/Edit Products</MenuItem>
          <MenuItem href={`/${locale}/apps/ecommerce/products/list`}>Products {dictionary['navigation'].list}</MenuItem>
          <MenuItem href={`/${locale}/apps/ecommerce/products/list`}>Variations Management (Sizes, Colors, etc.)</MenuItem>
          <MenuItem href={`/${locale}/apps/ecommerce/products/list`}>Product Cost Fields (Labor, Shipping, Fabric Costs)</MenuItem>
        </SubMenu>
        <SubMenu label={"Inventory Management"} icon={<i className='ri-home-smile-line' />}>
          <MenuItem href={`/${locale}/apps/ecommerce/products/list`}>Stock Overview</MenuItem>
          <MenuItem href={`/${locale}/apps/ecommerce/products/list`}>Low Stock Alerts</MenuItem>
          <MenuItem href={`/${locale}/apps/ecommerce/products/list`}>Backorders</MenuItem>
          <MenuItem href={`/${locale}/charts/apex-charts`}>Demand Forecasting</MenuItem>
        </SubMenu>
        <SubMenu label={"Categories & Collections"} icon={<i className='ri-home-smile-line' />}>
          <MenuItem href={`/${locale}/apps/ecommerce/products/category`}>
            Manage {dictionary['navigation'].category}
          </MenuItem>
          <MenuItem href={`/${locale}/apps/ecommerce/products/category`}>
            Assign Products to Categories
          </MenuItem>
        </SubMenu>
        <SubMenu label={dictionary['navigation'].orders + " Management"} icon={<i className='ri-home-smile-line' />}>
          <MenuItem href={`/${locale}/apps/ecommerce/orders/list`}>Order {dictionary['navigation'].list}</MenuItem>
          <MenuItem href={`/${locale}/apps/ecommerce/orders/list`}>Canceled/Returned Orders</MenuItem>
          <MenuItem
            href={`/${locale}/apps/ecommerce/orders/details/5434`}
            exactMatch={false}
            activeUrl='/apps/ecommerce/orders/details'
          >
            Order {dictionary['navigation'].details}
          </MenuItem>
        </SubMenu>
        <SubMenu label={dictionary['navigation'].invoice} icon={<i className='ri-bill-line' />}>
          <MenuItem href={`/${locale}/apps/invoice/add`}>Generate Invoices</MenuItem>
          <MenuItem href={`/${locale}/apps/invoice/list`}>Invoice {dictionary['navigation'].list}</MenuItem>
          <MenuItem href={`/${locale}/apps/invoice/list`}>Invoice Templates</MenuItem>
          <MenuItem
            href={`/${locale}/apps/invoice/preview/4987`}
            exactMatch={false}
            activeUrl='/apps/invoice/preview'
          >
            {dictionary['navigation'].preview}
          </MenuItem>
          <MenuItem href={`/${locale}/apps/invoice/edit/4987`} exactMatch={false} activeUrl='/apps/invoice/edit'>
            {dictionary['navigation'].edit}
          </MenuItem>
        </SubMenu>

        <SubMenu label={dictionary['navigation'].manageReviews} icon={<i className='ri-home-smile-line' />}>
          <MenuItem href={`/${locale}/apps/ecommerce/manage-reviews`}>
            {dictionary['navigation'].manageReviews}
          </MenuItem>
        </SubMenu>
        <SubMenu label={dictionary['navigation'].referrals} icon={<i className='ri-home-smile-line' />}>
          <MenuItem href={`/${locale}/apps/ecommerce/referrals`}>{dictionary['navigation'].referrals}</MenuItem>
        </SubMenu>
        {/* </MenuSection> */}

        {/* customers */}
        <MenuSection label={dictionary['navigation'].customers}>
          <SubMenu label={dictionary['navigation'].customers} icon={<i className='ri-home-smile-line' />}>
            <MenuItem href={`/${locale}/apps/ecommerce/customers/list`}>{dictionary['navigation'].list}</MenuItem>
            <MenuItem href={`/${locale}/apps/ecommerce/customers/list`}>Assign Unique Discounts</MenuItem>
            <MenuItem href={`/${locale}/apps/ecommerce/customers/list`}>Purchase History</MenuItem>
            <MenuItem
              href={`/${locale}/apps/ecommerce/customers/details/879861`}
              exactMatch={false}
              activeUrl='/apps/ecommerce/customers/details'
            >
              {dictionary['navigation'].details}
            </MenuItem>
          </SubMenu>
          <SubMenu label={"Retailer Management"} icon={<i className='ri-home-smile-line' />}>
            <MenuItem href={`/${locale}/apps/ecommerce/customers/list`}>Manage Retailers</MenuItem>
            <MenuItem href={`/${locale}/apps/ecommerce/customers/list`}>Assign Sales Agents</MenuItem>
            <MenuItem href={`/${locale}/apps/ecommerce/customers/list`}>Custom Pricing & Terms</MenuItem>
          </SubMenu>
          <SubMenu label={"Sales Agents"} icon={<i className='ri-home-smile-line' />}>
            <MenuItem href={`/${locale}/apps/ecommerce/customers/list`}>Add/Edit Sales Agents</MenuItem>
            <MenuItem href={`/${locale}/apps/ecommerce/customers/list`}>Assign Retailers to Agents</MenuItem>
            <MenuItem href={`/${locale}/apps/ecommerce/customers/list`}>Performance Tracking</MenuItem>
          </SubMenu>

          <SubMenu label={dictionary['navigation'].logistics} icon={<i className='ri-car-line' />}>
            <MenuItem href={`/${locale}/apps/logistics/dashboard`}>{dictionary['navigation'].dashboard}</MenuItem>
            <MenuItem href={`/${locale}/apps/logistics/fleet`}>{dictionary['navigation'].fleet}</MenuItem>
          </SubMenu>
        </MenuSection>

        {/* Marketing */}
        <MenuSection label={"Marketing"}>
          <SubMenu label={"Discounts & Coupons"} icon={<i className='ri-home-smile-line' />}>
            <MenuItem href={`/${locale}/apps/ecommerce/customers/list`}>Create/Edit Discounts</MenuItem>
            <MenuItem href={`/${locale}/apps/ecommerce/customers/list`}>Bulk Discounts</MenuItem>
            <MenuItem href={`/${locale}/apps/ecommerce/customers/list`}>Gift Cards</MenuItem>
          </SubMenu>
          <SubMenu label={"Email Campaigns"} icon={<i className='ri-home-smile-line' />}>
            <MenuItem href={`/${locale}/apps/ecommerce/customers/list`}>Newsletter Management</MenuItem>
            <MenuItem href={`/${locale}/apps/ecommerce/customers/list`}>Campaign Insights</MenuItem>
          </SubMenu>
          <SubMenu label={"Social Media"} icon={<i className='ri-home-smile-line' />}>
            <MenuItem href={`/${locale}/apps/ecommerce/customers/list`}>Instagram Feed Integration</MenuItem>
            <MenuItem href={`/${locale}/apps/ecommerce/customers/list`}>Product Tagging (Instagram/Facebook)</MenuItem>
          </SubMenu>
        </MenuSection>

        {/* Analytics & Reports */}
        <MenuSection label={"Analytics & Reports"}>
          <SubMenu label={"Reports"} icon={<i className='ri-home-smile-line' />}>
            <MenuItem href={`/${locale}/apps/ecommerce/customers/list`}>Sales Reports</MenuItem>
            <MenuItem href={`/${locale}/apps/ecommerce/customers/list`}>Customer Reports</MenuItem>
            <MenuItem href={`/${locale}/apps/ecommerce/customers/list`}>Product Performance</MenuItem>
            <MenuItem href={`/${locale}/apps/ecommerce/customers/list`}>Marketing Insights</MenuItem>
          </SubMenu>
          <SubMenu label={"Google Analytics Integration"} icon={<i className='ri-home-smile-line' />}>
            <MenuItem href={`/${locale}/apps/ecommerce/customers/list`}>Traffic Reports</MenuItem>
            <MenuItem href={`/${locale}/apps/ecommerce/customers/list`}>Conversion Goals</MenuItem>
            <MenuItem href={`/${locale}/apps/ecommerce/customers/list`}>Event Tracking</MenuItem>
          </SubMenu>
        </MenuSection>

        {/* Website Management */}
        <MenuSection label={"Website Management"}>
          <SubMenu label={"Content Pages"} icon={<i className='ri-home-smile-line' />}>
            <MenuItem href={`/${locale}/apps/ecommerce/customers/list`}>Add/Edit Static Pages</MenuItem>
            <MenuItem href={`/${locale}/apps/ecommerce/customers/list`}>Legal Pages Management</MenuItem>
          </SubMenu>
          <SubMenu label={"SEO Optimization"} icon={<i className='ri-home-smile-line' />}>
            <MenuItem href={`/${locale}/apps/ecommerce/customers/list`}>Meta Titles/Descriptions</MenuItem>
            <MenuItem href={`/${locale}/apps/ecommerce/customers/list`}>Sitemap Generation</MenuItem>
          </SubMenu>
          <SubMenu label={"UI/UX Configurations"} icon={<i className='ri-home-smile-line' />}>
            <MenuItem href={`/${locale}/apps/ecommerce/customers/list`}>Homepage Hero Section</MenuItem>
            <MenuItem href={`/${locale}/apps/ecommerce/customers/list`}>Navigation Menu</MenuItem>
            <MenuItem href={`/${locale}/apps/ecommerce/customers/list`}>Cookie Bar Settings</MenuItem>
          </SubMenu>
        </MenuSection>

        {/* settings */}
        <MenuSection label={dictionary['navigation'].settings}>
          <SubMenu label={"Store " + dictionary['navigation'].settings} icon={<i className='ri-home-smile-line' />}>
            <MenuItem href={`/${locale}/apps/ecommerce/settings`}>General Configuration</MenuItem>
            <MenuItem href={`/${locale}/apps/ecommerce/settings`}>Shipping Methods</MenuItem>
            <MenuItem href={`/${locale}/apps/ecommerce/settings`}>Tax Settings</MenuItem>
          </SubMenu>

          <SubMenu label={dictionary['navigation'].user} icon={<i className='ri-user-line' />}>
            <MenuItem href={`/${locale}/apps/user/list`}>{dictionary['navigation'].list}</MenuItem>
            <MenuItem href={`/${locale}/apps/user/view`}>{dictionary['navigation'].view}</MenuItem>
          </SubMenu>
          <SubMenu label={dictionary['navigation'].rolesPermissions} icon={<i className='ri-lock-2-line' />}>
            <MenuItem href={`/${locale}/apps/roles`}>Manage Roles (Administrator, CEO, Employee, Intern, Sales Agent)</MenuItem>
            <MenuItem href={`/${locale}/apps/permissions`}>Assign {dictionary['navigation'].permissions}</MenuItem>
          </SubMenu>
          <SubMenu label={"Localization"} icon={<i className='ri-home-smile-line' />}>
            <MenuItem href={`/${locale}/apps/ecommerce/settings`}>Language Management</MenuItem>
            <MenuItem href={`/${locale}/apps/ecommerce/settings`}>Currency Settings</MenuItem>
            <MenuItem href={`/${locale}/apps/ecommerce/settings`}>Geolocation Configuration</MenuItem>
          </SubMenu>
          <MenuItem href={`/${locale}/pages/user-profile`} icon={<i className='ri-mail-open-line' />}>{dictionary['navigation'].userProfile}</MenuItem>
          <MenuItem href={`/${locale}/pages/account-settings`} icon={<i className='ri-mail-open-line' />}>{dictionary['navigation'].accountSettings}</MenuItem>
          <MenuItem
            href={`/${locale}/apps/email`}
            icon={<i className='ri-mail-open-line' />}
            exactMatch={false}
            activeUrl='/apps/email'
          >
            {dictionary['navigation'].email}
          </MenuItem>
          <MenuItem href={`/${locale}/apps/chat`} icon={<i className='ri-wechat-line' />}>
            {dictionary['navigation'].chat}
          </MenuItem>
          <MenuItem href={`/${locale}/apps/calendar`} icon={<i className='ri-calendar-line' />}>
            {dictionary['navigation'].calendar}
          </MenuItem>
          <MenuItem href={`/${locale}/apps/kanban`} icon={<i className='ri-drag-drop-line' />}>
            {dictionary['navigation'].kanban}
          </MenuItem>
        </MenuSection>







        <MenuSection label={dictionary['navigation'].appsPages}>



          <SubMenu label={dictionary['navigation'].academy} icon={<i className='ri-graduation-cap-line' />}>
            <MenuItem href={`/${locale}/apps/academy/dashboard`}>{dictionary['navigation'].dashboard}</MenuItem>
            <MenuItem href={`/${locale}/apps/academy/my-courses`}>{dictionary['navigation'].myCourses}</MenuItem>
            <MenuItem href={`/${locale}/apps/academy/course-details`}>
              {dictionary['navigation'].courseDetails}
            </MenuItem>
          </SubMenu>




          <SubMenu label={dictionary['navigation'].frontPages} icon={<i className='ri-file-copy-line' />}>
            <MenuItem href='/front-pages/landing-page' target='_blank'>
              {dictionary['navigation'].landing}
            </MenuItem>
            <MenuItem href='/front-pages/pricing' target='_blank'>
              {dictionary['navigation'].pricing}
            </MenuItem>
            <MenuItem href='/front-pages/payment' target='_blank'>
              {dictionary['navigation'].payment}
            </MenuItem>
            <MenuItem href='/front-pages/checkout' target='_blank'>
              {dictionary['navigation'].checkout}
            </MenuItem>
            <MenuItem href='/front-pages/help-center' target='_blank'>
              {dictionary['navigation'].helpCenter}
            </MenuItem>
          </SubMenu>

          <SubMenu label={dictionary['navigation'].pages} icon={<i className='ri-layout-left-line' />}>
            <MenuItem href={`/${locale}/pages/faq`}>{dictionary['navigation'].faq}</MenuItem>
            <MenuItem href={`/${locale}/pages/pricing`}>{dictionary['navigation'].pricing}</MenuItem>
            <SubMenu label={dictionary['navigation'].miscellaneous}>
              <MenuItem href={`/${locale}/pages/misc/coming-soon`} target='_blank'>
                {dictionary['navigation'].comingSoon}
              </MenuItem>
              <MenuItem href={`/${locale}/pages/misc/under-maintenance`} target='_blank'>
                {dictionary['navigation'].underMaintenance}
              </MenuItem>
              <MenuItem href={`/${locale}/pages/misc/404-not-found`} target='_blank'>
                {dictionary['navigation'].pageNotFound404}
              </MenuItem>
              <MenuItem href={`/${locale}/pages/misc/401-not-authorized`} target='_blank'>
                {dictionary['navigation'].notAuthorized401}
              </MenuItem>
            </SubMenu>
          </SubMenu>
          <SubMenu label={dictionary['navigation'].authPages} icon={<i className='ri-shield-keyhole-line' />}>
            <SubMenu label={dictionary['navigation'].login}>
              <MenuItem href={`/${locale}/pages/auth/login-v1`} target='_blank'>
                {dictionary['navigation'].loginV1}
              </MenuItem>
              <MenuItem href={`/${locale}/pages/auth/login-v2`} target='_blank'>
                {dictionary['navigation'].loginV2}
              </MenuItem>
            </SubMenu>
            <SubMenu label={dictionary['navigation'].register}>
              <MenuItem href={`/${locale}/pages/auth/register-v1`} target='_blank'>
                {dictionary['navigation'].registerV1}
              </MenuItem>
              <MenuItem href={`/${locale}/pages/auth/register-v2`} target='_blank'>
                {dictionary['navigation'].registerV2}
              </MenuItem>
              <MenuItem href={`/${locale}/pages/auth/register-multi-steps`} target='_blank'>
                {dictionary['navigation'].registerMultiSteps}
              </MenuItem>
            </SubMenu>
            <SubMenu label={dictionary['navigation'].verifyEmail}>
              <MenuItem href={`/${locale}/pages/auth/verify-email-v1`} target='_blank'>
                {dictionary['navigation'].verifyEmailV1}
              </MenuItem>
              <MenuItem href={`/${locale}/pages/auth/verify-email-v2`} target='_blank'>
                {dictionary['navigation'].verifyEmailV2}
              </MenuItem>
            </SubMenu>
            <SubMenu label={dictionary['navigation'].forgotPassword}>
              <MenuItem href={`/${locale}/pages/auth/forgot-password-v1`} target='_blank'>
                {dictionary['navigation'].forgotPasswordV1}
              </MenuItem>
              <MenuItem href={`/${locale}/pages/auth/forgot-password-v2`} target='_blank'>
                {dictionary['navigation'].forgotPasswordV2}
              </MenuItem>
            </SubMenu>
            <SubMenu label={dictionary['navigation'].resetPassword}>
              <MenuItem href={`/${locale}/pages/auth/reset-password-v1`} target='_blank'>
                {dictionary['navigation'].resetPasswordV1}
              </MenuItem>
              <MenuItem href={`/${locale}/pages/auth/reset-password-v2`} target='_blank'>
                {dictionary['navigation'].resetPasswordV2}
              </MenuItem>
            </SubMenu>
            <SubMenu label={dictionary['navigation'].twoSteps}>
              <MenuItem href={`/${locale}/pages/auth/two-steps-v1`} target='_blank'>
                {dictionary['navigation'].twoStepsV1}
              </MenuItem>
              <MenuItem href={`/${locale}/pages/auth/two-steps-v2`} target='_blank'>
                {dictionary['navigation'].twoStepsV2}
              </MenuItem>
            </SubMenu>
          </SubMenu>
          <SubMenu label={dictionary['navigation'].wizardExamples} icon={<i className='ri-git-commit-line' />}>
            <MenuItem href={`/${locale}/pages/wizard-examples/checkout`}>{dictionary['navigation'].checkout}</MenuItem>
            <MenuItem href={`/${locale}/pages/wizard-examples/property-listing`}>
              {dictionary['navigation'].propertyListing}
            </MenuItem>
            <MenuItem href={`/${locale}/pages/wizard-examples/create-deal`}>
              {dictionary['navigation'].createDeal}
            </MenuItem>
          </SubMenu>
          <MenuItem href={`/${locale}/pages/dialog-examples`} icon={<i className='ri-tv-2-line' />}>
            {dictionary['navigation'].dialogExamples}
          </MenuItem>
          <SubMenu label={dictionary['navigation'].widgetExamples} icon={<i className='ri-bar-chart-box-line' />}>
            <MenuItem href={`/${locale}/pages/widget-examples/basic`}>{dictionary['navigation'].basic}</MenuItem>
            <MenuItem href={`/${locale}/pages/widget-examples/advanced`}>{dictionary['navigation'].advanced}</MenuItem>
            <MenuItem href={`/${locale}/pages/widget-examples/statistics`}>
              {dictionary['navigation'].statistics}
            </MenuItem>
            <MenuItem href={`/${locale}/pages/widget-examples/charts`}>{dictionary['navigation'].charts}</MenuItem>
            <MenuItem href={`/${locale}/pages/widget-examples/gamification`}>
              {dictionary['navigation'].gamification}
            </MenuItem>
            <MenuItem href={`/${locale}/pages/widget-examples/actions`}>{dictionary['navigation'].actions}</MenuItem>
          </SubMenu>
        </MenuSection>
        <MenuSection label={dictionary['navigation'].formsAndTables}>
          <MenuItem href={`/${locale}/forms/form-layouts`} icon={<i className='ri-layout-4-line' />}>
            {dictionary['navigation'].formLayouts}
          </MenuItem>
          <MenuItem href={`/${locale}/forms/form-validation`} icon={<i className='ri-checkbox-multiple-line' />}>
            {dictionary['navigation'].formValidation}
          </MenuItem>
          <MenuItem href={`/${locale}/forms/form-wizard`} icon={<i className='ri-git-commit-line' />}>
            {dictionary['navigation'].formWizard}
          </MenuItem>
          <MenuItem href={`/${locale}/react-table`} icon={<i className='ri-table-alt-line' />}>
            {dictionary['navigation'].reactTable}
          </MenuItem>
          <MenuItem
            href={`${process.env.NEXT_PUBLIC_DOCS_URL}/docs/user-interface/form-elements`}
            suffix={<i className='ri-external-link-line text-xl' />}
            target='_blank'
            icon={<i className='ri-radio-button-line' />}
          >
            {dictionary['navigation'].formELements}
          </MenuItem>
          <MenuItem
            href={`${process.env.NEXT_PUBLIC_DOCS_URL}/docs/user-interface/mui-table`}
            suffix={<i className='ri-external-link-line text-xl' />}
            target='_blank'
            icon={<i className='ri-table-2' />}
          >
            {dictionary['navigation'].muiTables}
          </MenuItem>
        </MenuSection>
        <MenuSection label={dictionary['navigation'].chartsMisc}>
          <SubMenu label={dictionary['navigation'].charts} icon={<i className='ri-bar-chart-2-line' />}>
            <MenuItem href={`/${locale}/charts/apex-charts`}>{dictionary['navigation'].apex}</MenuItem>
            <MenuItem href={`/${locale}/charts/recharts`}>{dictionary['navigation'].recharts}</MenuItem>
          </SubMenu>
          <MenuItem
            href={`${process.env.NEXT_PUBLIC_DOCS_URL}/docs/user-interface/foundation`}
            suffix={<i className='ri-external-link-line text-xl' />}
            target='_blank'
            icon={<i className='ri-pantone-line' />}
          >
            {dictionary['navigation'].foundation}
          </MenuItem>
          <MenuItem
            href={`${process.env.NEXT_PUBLIC_DOCS_URL}/docs/user-interface/components`}
            suffix={<i className='ri-external-link-line text-xl' />}
            target='_blank'
            icon={<i className='ri-toggle-line' />}
          >
            {dictionary['navigation'].components}
          </MenuItem>
          <MenuItem
            href={`${process.env.NEXT_PUBLIC_DOCS_URL}/docs/menu-examples/overview`}
            suffix={<i className='ri-external-link-line text-xl' />}
            target='_blank'
            icon={<i className='ri-menu-search-line' />}
          >
            {dictionary['navigation'].menuExamples}
          </MenuItem>
          <MenuItem
            href='https://shapon.ticksy.com'
            suffix={<i className='ri-external-link-line text-xl' />}
            target='_blank'
            icon={<i className='ri-lifebuoy-line' />}
          >
            {dictionary['navigation'].raiseSupport}
          </MenuItem>
          <MenuItem
            href='https://demos.shapon.com/materialize-nextjs-admin-template/documentation'
            suffix={<i className='ri-external-link-line text-xl' />}
            target='_blank'
            icon={<i className='ri-book-line' />}
          >
            {dictionary['navigation'].documentation}
          </MenuItem>
          <SubMenu label={dictionary['navigation'].others} icon={<i className='ri-more-line' />}>
            <MenuItem suffix={<Chip label='New' size='small' color='info' />}>
              {dictionary['navigation'].itemWithBadge}
            </MenuItem>
            <MenuItem
              href='https://www.fiverr.com/shapon_pal'
              target='_blank'
              suffix={<i className='ri-external-link-line text-xl' />}
            >
              {dictionary['navigation'].externalLink}
            </MenuItem>
            <SubMenu label={dictionary['navigation'].menuLevels}>
              <MenuItem>{dictionary['navigation'].menuLevel2}</MenuItem>
              <SubMenu label={dictionary['navigation'].menuLevel2}>
                <MenuItem>{dictionary['navigation'].menuLevel3}</MenuItem>
                <MenuItem>{dictionary['navigation'].menuLevel3}</MenuItem>
              </SubMenu>
            </SubMenu>
            <MenuItem disabled>{dictionary['navigation'].disabledMenu}</MenuItem>
          </SubMenu>
        </MenuSection>
      </Menu>
      {/* <Menu
        popoutMenuOffset={{ mainAxis: 17 }}
        menuItemStyles={menuItemStyles(verticalNavOptions, theme)}
        renderExpandIcon={({ open }) => <RenderExpandIcon open={open} transitionDuration={transitionDuration} />}
        renderExpandedMenuItemIcon={{ icon: <i className='ri-circle-fill' /> }}
        menuSectionStyles={menuSectionStyles(verticalNavOptions, theme)}
      >
        <GenerateVerticalMenu menuData={menuData(dictionary, params)} />
      </Menu> */}
    </ScrollWrapper>
  )
}

export default EcommerceVerticalMenu
