import gql from 'graphql-tag';
import { astSerializer, queryPlanSerializer } from '../../snapshotSerializers';
import { execute, ServiceDefinitionModule } from '../execution-utils';

expect.addSnapshotSerializer(astSerializer);
expect.addSnapshotSerializer(queryPlanSerializer);

const nodeService: ServiceDefinitionModule = {
  name: 'nodeService',
  typeDefs: gql`
    extend type Activity implements Node @key(fields: "id") {
      id: ID! @external
    }

    extend type AvailabilityRequest implements Node @key(fields: "id") {
      id: ID! @external
    }

    extend type Badge implements Node @key(fields: "id") {
      id: ID! @external
    }

    # extend type BillingCycle implements Node @key(fields: "id") {
    #   id: ID! @external
    # }

    extend type CallbackRequest implements Node @key(fields: "id") {
      id: ID! @external
    }

    extend type Client implements Node @key(fields: "id") {
      id: ID! @external
    }

    extend type ClientMatcher implements Node @key(fields: "id") {
      id: ID! @external
    }

    extend type CommunityEvent implements Node @key(fields: "id") {
      id: ID! @external
    }

    extend type CompanyRepresentative implements Node @key(fields: "id") {
      id: ID! @external
    }

    extend type Country implements Node @key(fields: "id") {
      id: ID! @external
    }

    extend type EmailTemplate implements Node @key(fields: "id") {
      id: ID! @external
    }

    extend type Engagement implements Node @key(fields: "id") {
      id: ID! @external
    }

    extend type EngagementBreak implements Node @key(fields: "id") {
      id: ID! @external
    }

    extend type FeedbackReason implements Node @key(fields: "id") {
      id: ID! @external
    }

    extend type Interview implements Node @key(fields: "id") {
      id: ID! @external
    }

    # extend type Invoice implements Node @key(fields: "id") {
    #   id: ID! @external
    # }

    extend type Job implements Node @key(fields: "id") {
      id: ID! @external
    }

    extend type JobPositionQuestion implements Node @key(fields: "id") {
      id: ID! @external
    }

    extend type Leader implements Node @key(fields: "id") {
      id: ID! @external
    }

    extend type MasterBookingPageConfiguration implements Node
      @key(fields: "id") {
      id: ID! @external
    }

    extend type Meeting implements Node @key(fields: "id") {
      id: ID! @external
    }

    extend type MeetingScheduler implements Node @key(fields: "id") {
      id: ID! @external
    }

    # extend type Memorandum implements Node @key(fields: "id") {
    #   id: ID! @external
    # }

    extend type MentorApplication implements Node @key(fields: "id") {
      id: ID! @external
    }

    interface Node {
      id: ID!
    }

    extend type Note implements Node @key(fields: "id") {
      id: ID! @external
    }

    extend type OperationalIssue implements Node @key(fields: "id") {
      id: ID! @external
    }

    extend type OperationalIssueCauseTemplate implements Node
      @key(fields: "id") {
      id: ID! @external
    }

    extend type OperationalIssueTemplate implements Node @key(fields: "id") {
      id: ID! @external
    }

    extend type Opportunity implements Node @key(fields: "id") {
      id: ID! @external
    }

    # extend type Payment implements Node @key(fields: "id") {
    #   id: ID! @external
    # }

    extend type PlaybookTemplate implements Node @key(fields: "id") {
      id: ID! @external
    }

    extend type PurchaseOrder implements Node @key(fields: "id") {
      id: ID! @external
    }

    type Query {
      node(id: ID!): Node
      nodes(ids: [ID!]!): [Node]!
    }

    extend type ReferralPartner implements Node @key(fields: "id") {
      id: ID! @external
    }

    extend type ReviewAttempt implements Node @key(fields: "id") {
      id: ID! @external
    }

    extend type RoleFlag implements Node @key(fields: "id") {
      id: ID! @external
    }

    extend type RoleStep implements Node @key(fields: "id") {
      id: ID! @external
    }

    extend type ScholarshipApplication implements Node @key(fields: "id") {
      id: ID! @external
    }

    extend type Skill implements Node @key(fields: "id") {
      id: ID! @external
    }

    extend type SkillCategory implements Node @key(fields: "id") {
      id: ID! @external
    }

    extend type Specialization implements Node @key(fields: "id") {
      id: ID! @external
    }

    extend type Staff implements Node @key(fields: "id") {
      id: ID! @external
    }

    extend type Talent implements Node @key(fields: "id") {
      id: ID! @external
    }

    extend type TalentPartner implements Node @key(fields: "id") {
      id: ID! @external
    }

    extend type Task implements Node @key(fields: "id") {
      id: ID! @external
    }

    extend type TaskTag implements Node @key(fields: "id") {
      id: ID! @external
    }

    extend type Team implements Node @key(fields: "id") {
      id: ID! @external
    }

    # extend type Timesheet implements Node @key(fields: "id") {
    #   id: ID! @external
    # }

    # extend type Transfer implements Node @key(fields: "id") {
    #   id: ID! @external
    # }

    extend type Vertical implements Node @key(fields: "id") {
      id: ID! @external
    }
  `,
  resolvers: {
    Query: {
      nodes(_, { ids }) {
        return ids.map((id: string) => ({ id, type: id.split('/')[0] }));
      },
    },
    Node: {
      __resolveType(object) {
        return object.type;
      },
    },
  },
};

type Talent = { id: String; fullName: String };
const staffService: ServiceDefinitionModule = {
  name: 'staffSchema',
  typeDefs: gql`
    """
    Ach Billing Option

    Represents the option when client wants us to charge their CC.
    """
    type ACHBillingOption implements BillingOptionInterface {
      """
      The way money are sent to client

      Can be one of:
        - Wire
        - PayPal
        - Credit Card
        - ACH (also obsolete Manual and Automatic ACH)
      """
      billingMethod: BillingMethodName!
      discountValue: Int!
      discountable: Boolean!
      id: ID!

      """
      Last four digits of the CC number
      """
      last4Digits: String!
      name: String!
    }

    """
    Autogenerated input type of AcceptTaskDispute
    """
    input AcceptTaskDisputeInput {
      """
      A unique identifier for the client performing the mutation.
      """
      clientMutationId: String
      comment: String!
      taskId: ID!
    }

    """
    Autogenerated return type of AcceptTaskDispute
    """
    type AcceptTaskDisputePayload implements MutationResult {
      """
      A unique identifier for the client performing the mutation.
      """
      clientMutationId: String
      errors: [UserError!]!
      notice: String
      success: Boolean!
      task: Task
    }

    """
    Determines access/visibility level of items
      - MyBilling: Shows invoices only the current user has access to.
      - TeamBilling: Like MyBilling, but gathered for all people from the team managed by the user (supervisor mode)
    """
    scalar AccessLevelFilter

    type Activity implements Node @key(fields: "id") {
      activityContactRoles: RoleConnection!
      details: String!
      id: ID!
      occurredAt: Time
      operations: ActivityOperations!

      """
      Depending on the type it is supposed to be one of *ActivityOutcome enum values
      """
      outcome: String!

      """
      Depending on the type it is supposed to be one of *ActivitySubtype enum values
      """
      subtype: String!
      title: String!
      type: ActivityType!
    }

    type ActivityOperations {
      updateActivity: Operation!
    }

    enum ActivityType {
      CALL
      EMAIL
      MEETING
      MESSAGING
      OTHER
    }

    """
    Autogenerated input type of AddTaskComment
    """
    input AddTaskCommentInput {
      """
      A unique identifier for the client performing the mutation.
      """
      clientMutationId: String
      comment: String!
      taskId: ID!
    }

    """
    Autogenerated return type of AddTaskComment
    """
    type AddTaskCommentPayload implements MutationResult {
      """
      A unique identifier for the client performing the mutation.
      """
      clientMutationId: String
      errors: [UserError!]!
      notice: String
      success: Boolean!
      task: Task
    }

    """
    Autogenerated input type of AddTaskTag
    """
    input AddTaskTagInput {
      """
      A unique identifier for the client performing the mutation.
      """
      clientMutationId: String
      tagId: ID!
      taskId: ID!
    }

    """
    Autogenerated return type of AddTaskTag
    """
    type AddTaskTagPayload implements MutationResult {
      """
      A unique identifier for the client performing the mutation.
      """
      clientMutationId: String
      errors: [UserError!]!
      notice: String
      success: Boolean!
      task: Task
    }

    """
    Autogenerated input type of AddTaskWatcher
    """
    input AddTaskWatcherInput {
      """
      A unique identifier for the client performing the mutation.
      """
      clientMutationId: String
      taskId: ID!
      watcherId: ID!
    }

    """
    Autogenerated return type of AddTaskWatcher
    """
    type AddTaskWatcherPayload implements MutationResult {
      """
      A unique identifier for the client performing the mutation.
      """
      clientMutationId: String
      errors: [UserError!]!
      notice: String
      success: Boolean!
      task: Task
    }

    type AdjustedCommitment {
      adjustedCompanyRate: CommitmentRate!
      adjustedRevenueRate: CommitmentRate!
      adjustedTalentRate: CommitmentRate!
    }

    type ApplicationInfo implements WebResource {
      attributes: [KeyValueStrings!]!
      id: ID!
      webResource: Link!
    }

    """
    Autogenerated input type of ApproveClient
    """
    input ApproveClientInput {
      clientId: ID!

      """
      A unique identifier for the client performing the mutation.
      """
      clientMutationId: String
      phoneNumber: String
      skype: String
    }

    """
    Autogenerated return type of ApproveClient
    """
    type ApproveClientPayload implements MutationResult {
      client: Client

      """
      A unique identifier for the client performing the mutation.
      """
      clientMutationId: String
      errors: [UserError!]!
      notice: String
      success: Boolean!
    }

    """
    Autogenerated input type of ApproveJob
    """
    input ApproveJobInput {
      claimerId: ID

      """
      A unique identifier for the client performing the mutation.
      """
      clientMutationId: String
      comment: String
      deposit: BigDecimal
      expectedWeeklyHours: Int
      hiddenForTalents: Boolean
      jobDescription: String
      jobId: ID!
      jobPositionQuestions: [JobPositionQuestionInput!]
      longshotReasons: [String!]
      matchingCallDate: Date
      matchingCallTime: Time
      maxHourlyRate: Int
      meetingId: ID
      nicheLongShot: Boolean
      noMatchingCall: Boolean
      noMatchingCallComment: String
      noRateLimit: Boolean
      recommendedSkills: String
      requiredApplicationPitch: Boolean
      requiredExperience: String
      skillLongShot: Boolean
      skillSets: [SkillSetInput!]
      skipApprovalNotifications: Boolean
      skipQualityChecks: Boolean
      skipQuestionsChecks: Boolean
      skipSkillsChecks: Boolean
      specializationId: ID
      tasksAndDeliverables: String
    }

    """
    Autogenerated return type of ApproveJob
    """
    type ApproveJobPayload implements MutationResult {
      """
      A unique identifier for the client performing the mutation.
      """
      clientMutationId: String
      errors: [UserError!]!
      job: Job
      notice: String
      success: Boolean!
    }

    """
    Autogenerated input type of ApproveOperationalIssue
    """
    input ApproveOperationalIssueInput {
      """
      A unique identifier for the client performing the mutation.
      """
      clientMutationId: String
      comment: String
      operationalIssueId: ID!
    }

    """
    Autogenerated return type of ApproveOperationalIssue
    """
    type ApproveOperationalIssuePayload implements MutationResult {
      """
      A unique identifier for the client performing the mutation.
      """
      clientMutationId: String
      errors: [UserError!]!
      notice: String
      operationalIssue: OperationalIssue
      success: Boolean!
    }

    """
    Autogenerated input type of AssignMeetingAttendee
    """
    input AssignMeetingAttendeeInput {
      """
      Role id to assign attendee
      """
      attendeeId: ID!

      """
      A unique identifier for the client performing the mutation.
      """
      clientMutationId: String
      meetingId: ID!
    }

    """
    Autogenerated return type of AssignMeetingAttendee
    """
    type AssignMeetingAttendeePayload implements MutationResult {
      """
      A unique identifier for the client performing the mutation.
      """
      clientMutationId: String
      errors: [UserError!]!
      meeting: Meeting
      notice: String
      success: Boolean!
    }

    type AutocompleteConnection {
      edges: [AutocompleteEdge!]!
      nodes: [Node!]!
      totalCount: Int!
    }

    type AutocompleteEdge {
      label: String
      labelHighlight: String
      node: Node!
      nodeTypes: [String!]!
    }

    input AutocompleteFilter {
      excludedIds: [ID!]
      model: AutocompleteModels!
      term: String
    }

    enum AutocompleteModels {
      ACTIVE_OR_WITH_INVOICES_CLIENTS
      ACTIVE_STAFF
      CALLBACK_REQUEST_CLAIMER
      JOBS
      MEETING_ATTENDEE
      QUICK_SEARCH
      TALENTS
      TASK_SEARCH_KEYWORDS
      TASK_SEARCH_NAMES
      TASK_STAFF
      TASK_TAGS
      USER
      USERS
    }

    type AvailabilityRequest implements Node @key(fields: "id") {
      comment: String
      createdAt: Time!
      id: ID!
    }

    type AvailabilityRequestConnection {
      nodes: [AvailabilityRequest!]!
      totalCount: Int!
    }

    type Badge implements Node @key(fields: "id") {
      color: String
      id: ID!
      targetRole: String
      title: String!
      token: String
    }

    type BadgeConnection {
      nodes: [Badge!]!
    }

    type BaseMutationObject implements MutationResult {
      errors: [UserError!]!
      notice: String
      success: Boolean!
    }

    """
    Autogenerated input type of BecomeMeetingOrganizer
    """
    input BecomeMeetingOrganizerInput {
      """
      A unique identifier for the client performing the mutation.
      """
      clientMutationId: String
      meetingId: ID!
      schedulerId: String!
    }

    """
    Autogenerated return type of BecomeMeetingOrganizer
    """
    type BecomeMeetingOrganizerPayload implements MutationResult {
      """
      A unique identifier for the client performing the mutation.
      """
      clientMutationId: String
      errors: [UserError!]!
      meeting: Meeting
      notice: String
      success: Boolean!
    }

    """
    Decimal number
    """
    scalar BigDecimal

    """
    Possible engagement billing cycles.
    """
    enum BillCycle {
      BI_WEEKLY
      MONTHLY
      SEMI_MONTHLY
      WEEKLY
    }

    type BillingMethod {
      discountValue: Int!
      discountable: Boolean!
      name: String!
    }

    """
    Available Billing Option methods
    """
    enum BillingMethodName {
      ACH
      AUTOMATIC_ACH
      CREDIT_CARD
      MANUAL_ACH
      PAYPAL
      WIRE
    }

    """
    Common interface for billing options

    The concrete type is instantiated based on billing_method value.
    """
    interface BillingOptionInterface {
      """
      The way money are sent to client

      Can be one of:
        - Wire
        - PayPal
        - Credit Card
        - ACH (also obsolete Manual and Automatic ACH)
      """
      billingMethod: BillingMethodName!
      discountValue: Int!
      discountable: Boolean!
      id: ID!
      name: String!
    }

    type BillingOptionInterfaceConnection {
      nodes: [BillingOptionInterface!]!
    }

    """
    Autogenerated input type of BlackFlagClient
    """
    input BlackFlagClientInput {
      clientId: ID!

      """
      A unique identifier for the client performing the mutation.
      """
      clientMutationId: String
      comment: String!
      reasonId: ID!
      refundDeposit: Boolean
      subReasonId: ID
    }

    """
    Autogenerated return type of BlackFlagClient
    """
    type BlackFlagClientPayload implements MutationResult {
      client: Client

      """
      A unique identifier for the client performing the mutation.
      """
      clientMutationId: String
      errors: [UserError!]!
      notice: String
      success: Boolean!
    }

    enum BusinessTypes {
      DEV_SHOP_OR_AGENCY
      ENTERPRISE_BUSINESS
      GOVERNMENT
      INDIVIDUAL
      MEDIUM_BUSINESS
      NON_PROFIT
      SMALL_BUSINESS
      START_UP
    }

    enum CallActivityOutcome {
      CALL_RESCHEDULED
      CONNECTED
      LEFT_VOICEMAIL
      NO_SHOW
      OTHER
    }

    enum CallActivitySubtype {
      ACCOUNT_MANAGEMENT
      FOLLOW_UP
      INVESTIGATION
      JOB_MANAGEMENT
      LEGAL_BILLING
      MATCHING_CALL
      OTHER
      SALES_CALL
    }

    """
    Autogenerated input type of CallContact
    """
    input CallContactInput {
      """
      A unique identifier for the client performing the mutation.
      """
      clientMutationId: String
      companyRepresentativeId: ID!
      contactId: ID!
    }

    """
    Autogenerated return type of CallContact
    """
    type CallContactPayload implements MutationResult {
      """
      A unique identifier for the client performing the mutation.
      """
      clientMutationId: String
      contact: CompanyRepresentativeContact
      errors: [UserError!]!
      notice: String
      success: Boolean!
    }

    input CallForwardingConfigurationHoursDayInput {
      enabled: Boolean!
      from: CallForwardingConfigurationHoursTimeInput!
      to: CallForwardingConfigurationHoursTimeInput!
    }

    input CallForwardingConfigurationHoursInput {
      friday: CallForwardingConfigurationHoursDayInput!
      monday: CallForwardingConfigurationHoursDayInput!
      saturday: CallForwardingConfigurationHoursDayInput!
      sunday: CallForwardingConfigurationHoursDayInput!
      thursday: CallForwardingConfigurationHoursDayInput!
      tuesday: CallForwardingConfigurationHoursDayInput!
      wednesday: CallForwardingConfigurationHoursDayInput!
    }

    input CallForwardingConfigurationHoursTimeInput {
      hours: Int!
      minutes: Int!
    }

    input CallForwardingConfigurationInput {
      hours: CallForwardingConfigurationHoursInput
      option: CallForwardingConfigurationOptions!
    }

    enum CallForwardingConfigurationOptions {
      ALWAYS
      NEVER
      SPECIFIC_HOURS
    }

    input CallbackFilter {
      callPurpose: [String!]
      callType: [String!]
      claimedAt: DateRange
      claimer: SearchableNoneMeId
      createdAt: DateRange
      late: Boolean
      statuses: [String!]
    }

    type CallbackRequest implements Node & Timezoned @key(fields: "id") {
      claimedAt: Time
      claimer: RoleOrClient
      client: Client
      createdAt: Time
      id: ID!
      inWorkingHours: Boolean
      job: Job
      late: Boolean!
      name: String
      obscureLead: Boolean!
      operations: CallbackRequestOperations!
      overlappingMeetings: CallbackRequestOverlappingMeetingConnection
      purpose: String
      requestedStartTime: Time
      status: String
      timeZone: TimeZone
      type: String
    }

    type CallbackRequestConnection {
      nodes: [CallbackRequest!]!
      totalCount: Int!
    }

    type CallbackRequestOperations {
      claimCallbackRequest: Operation!
      removeCallbackRequest: Operation!
    }

    """
    Represents overlapping meeting details for Callback Request
    """
    type CallbackRequestOverlappingMeeting {
      name: String!
      scheduledAt: Time!
    }

    type CallbackRequestOverlappingMeetingConnection {
      nodes: [CallbackRequestOverlappingMeeting!]!
    }

    """
    Autogenerated input type of CancelMeeting
    """
    input CancelMeetingInput {
      """
      A unique identifier for the client performing the mutation.
      """
      clientMutationId: String
      comment: String!
      meetingId: ID!
    }

    """
    Autogenerated return type of CancelMeeting
    """
    type CancelMeetingPayload implements MutationResult {
      """
      A unique identifier for the client performing the mutation.
      """
      clientMutationId: String
      errors: [UserError!]!
      meeting: Meeting
      notice: String
      success: Boolean!
    }

    """
    Autogenerated input type of CancelTaskDispute
    """
    input CancelTaskDisputeInput {
      """
      A unique identifier for the client performing the mutation.
      """
      clientMutationId: String
      comment: String!
      taskId: ID!
    }

    """
    Autogenerated return type of CancelTaskDispute
    """
    type CancelTaskDisputePayload implements MutationResult {
      """
      A unique identifier for the client performing the mutation.
      """
      clientMutationId: String
      errors: [UserError!]!
      notice: String
      success: Boolean!
      task: Task
    }

    """
    Autogenerated input type of CancelTask
    """
    input CancelTaskInput {
      """
      A unique identifier for the client performing the mutation.
      """
      clientMutationId: String
      taskId: ID!
    }

    """
    Autogenerated return type of CancelTask
    """
    type CancelTaskPayload implements MutationResult {
      """
      A unique identifier for the client performing the mutation.
      """
      clientMutationId: String
      errors: [UserError!]!
      notice: String
      success: Boolean!
      task: Task
    }

    """
    Autogenerated input type of ChangeEngagementCommitment
    """
    input ChangeEngagementCommitmentInput {
      changeDate: Date

      """
      A unique identifier for the client performing the mutation.
      """
      clientMutationId: String
      commitment: EngagementCommitmentEnum!
      companyFullTimeRate: BigDecimal
      companyHourlyRate: BigDecimal
      companyPartTimeRate: BigDecimal
      customRates: Boolean
      engagementId: ID!
      notifyCompany: Boolean
      notifyTalent: Boolean
      talentFullTimeRate: BigDecimal
      talentHourlyRate: BigDecimal
      talentPartTimeRate: BigDecimal
    }

    """
    Autogenerated return type of ChangeEngagementCommitment
    """
    type ChangeEngagementCommitmentPayload implements MutationResult {
      """
      A unique identifier for the client performing the mutation.
      """
      clientMutationId: String
      engagement: Engagement
      errors: [UserError!]!
      notice: String
      success: Boolean!
    }

    """
    Autogenerated input type of ChangeTaskPriority
    """
    input ChangeTaskPriorityInput {
      """
      A unique identifier for the client performing the mutation.
      """
      clientMutationId: String
      priority: TaskPriorityLevel!
      taskId: ID!
    }

    """
    Autogenerated return type of ChangeTaskPriority
    """
    type ChangeTaskPriorityPayload implements MutationResult {
      """
      A unique identifier for the client performing the mutation.
      """
      clientMutationId: String
      errors: [UserError!]!
      notice: String
      success: Boolean!
      task: Task
    }

    """
    Autogenerated input type of ChangeTaskRecurringPeriod
    """
    input ChangeTaskRecurringPeriodInput {
      """
      A unique identifier for the client performing the mutation.
      """
      clientMutationId: String
      recurringPeriod: Int!
      taskId: ID!
    }

    """
    Autogenerated return type of ChangeTaskRecurringPeriod
    """
    type ChangeTaskRecurringPeriodPayload implements MutationResult {
      """
      A unique identifier for the client performing the mutation.
      """
      clientMutationId: String
      errors: [UserError!]!
      notice: String
      success: Boolean!
      task: Task
    }

    """
    Autogenerated input type of ClaimCallbackRequest
    """
    input ClaimCallbackRequestInput {
      callbackRequestId: ID!

      """
      A unique identifier for the client performing the mutation.
      """
      clientMutationId: String
    }

    """
    Autogenerated return type of ClaimCallbackRequest
    """
    type ClaimCallbackRequestPayload implements MutationResult {
      callbackRequest: CallbackRequest

      """
      A unique identifier for the client performing the mutation.
      """
      clientMutationId: String
      errors: [UserError!]!
      notice: String
      success: Boolean!
    }

    """
    Autogenerated input type of ClaimClientEnterprise
    """
    input ClaimClientEnterpriseInput {
      clientId: ID!

      """
      A unique identifier for the client performing the mutation.
      """
      clientMutationId: String
      successfulCall: Boolean
      taskIds: [ID!]
    }

    """
    Autogenerated return type of ClaimClientEnterprise
    """
    type ClaimClientEnterprisePayload implements MutationResult {
      client: Client

      """
      A unique identifier for the client performing the mutation.
      """
      clientMutationId: String
      errors: [UserError!]!
      notice: String
      success: Boolean!
    }

    """
    Autogenerated input type of ClaimOperationalIssue
    """
    input ClaimOperationalIssueInput {
      """
      A unique identifier for the client performing the mutation.
      """
      clientMutationId: String
      operationalIssueId: ID!
    }

    """
    Autogenerated return type of ClaimOperationalIssue
    """
    type ClaimOperationalIssuePayload implements MutationResult {
      """
      A unique identifier for the client performing the mutation.
      """
      clientMutationId: String
      errors: [UserError!]!
      notice: String
      operationalIssue: OperationalIssue
      success: Boolean!
    }

    type Client implements EmailCarbonCopyOptions & EmailTemplates & Node & Notable & RelatedTasksHolder & Timezoned & WebResource
      @key(fields: "id")
      @key(fields: "_companyId") {
      """
      Internal, don't use
      """
      _accountingId: Int

      """
      Internal, don't use
      """
      _companyId: Int
      accountClass: String
      accountManager: Role
      activatedAt: Time!

      """
      Not optimized. N+1. Use when necessary. Try to avoid call within connection.
      """
      applicationInfo: ApplicationInfo
      badges: BadgeConnection
      billingNotes: String
      billingOptions: BillingOptionInterfaceConnection!
      billingVerifiedAt: Time
      blankEmailTemplate: EmailTemplate
      businessType: String
      claimableSince: Time
      claimer: Staff
      clientPartner: Role
      communicationTrackingToken(abilities: [String!]!): String!
      companyLegacyId: Int!
      contact: CompanyRepresentative!
      country: Country
      createdAt: Time!
      cumulativeStatus: ClientCumulativeStatus!
      daysInFunnel: Int

      """
      Not optimized. N+1. Use when necessary. Try to avoid call within connection.
      """
      depositRefundAllowed: Boolean
      dormantSince: Date
      email: String!
      emailCarbonCopyOptions: EmailCarbonCopyOptionConnection
      emailRecipientName: String!
      emailTemplates: EmailTemplateConnection!
      engagements(filter: ClientEngagementFilter): ClientEngagementConnection
      enterprise: Boolean!
      financeTeamMember: Staff
      fullName: String!

      """
      Not optimized. N+1. Use when necessary. Try to avoid call within connection.
      """
      hasPendingJobsWithDeposit: Boolean
      id: ID!
      intentScore: String!
      interestedIn: String
      investigations(filter: InvestigationsFilter): InvestigationConnection!
      isNew: Boolean!
      jobDepositCanBeIssued: Boolean!
      jobs(filter: ClientJobFilter): ClientJobConnection!
      leadPotential: ClientLeadPotential!
      matchers: ClientMatcherConnection!
      netTerms: Int!
      notes: NoteConnection
      obscureLead: Boolean!

      """
      Combined info from the client and relevant representative
      """
      ofacProhibitedCumulative: Boolean!
      ofacStatus: OfacStatus!
      ofacStatusComment: String
      operations: ClientOperations!
      parent: Client
      pendingCallbackRequest: CallbackRequest
      phones: ContactConnection!
      photo: Photo
      preferredBillingMethod: BillingMethod
      preferredBillingMethodDiscountable: Boolean
      preferredBillingOption: BillingOptionInterface
      promotions(
        filter: PromotionFilter

        """
        Offset parameter for connection node.
        """
        pagination: OffsetPagination
        sort: PromotionOrderFieldSortBy
      ): PromotionConnection!
      purchaseOrders(
        filter: ClientPurchaseOrderFilter
      ): PurchaseOrderConnection!
      quizItems: QuizItemConnection
      referralPage: Link
      referrer: RoleOrClient
      relatedTasks(
        filter: RelatedTasksFilter!
        pagination: OffsetPagination!
      ): RelatedTasksConnection
      relationshipManager: Role
      remoteQuizUrl: String
      representatives(
        filter: ClientRepresentativeFilter
        pagination: OffsetPagination
        sort: SortBy
      ): ClientRepresentativesConnection!
      reviewAttempts: ReviewAttemptConnection!
      reviewStatus: ReviewStatus!
      roleFlags: RoleFlagConnection!
      status: String!
      testimonials(filter: TestimonialFilter): ClientTestimonialsConnection
      timeZone: TimeZone
      twitter: String
      type: String!
      updateProfileUrl: String!
      userLegacyId: Int!
      viewerPendingCommunications: TaskSimpleConnection!
      webResource: Link!
      website: String
    }

    enum ClientAccountClass {
      DEFAULT
      ELITE
      PASSIVE
    }

    type ClientApplicantConnection {
      claimingDurationKpiChartDataUrl: String!
      nodes: [Client!]!
      totalCount: Int!
    }

    enum ClientClaimerCategory {
      CORE
      PRIORITY
      PROSPECT
      SECONDARY
    }

    type ClientConnection {
      nodes: [Client!]!
      totalCount: Int!
    }

    enum ClientContact {
      NONE
      PHONE
      PHONE_AND_SKYPE
      SKYPE
    }

    enum ClientContract {
      CLICKABLE_CONTRACTS
    }

    enum ClientCumulativeStatus {
      ACTIVE
      APPLIED
      BAD_LEAD
      BLACK_FLAGGED
      CONTACTED
      HAD_JOB
      HAS_ACTIVE_JOB
      OVERDUE_INVOICES
      PAUSED_ACTIVE
      PAUSED_APPLIED
      PENDING_BILLING_INFO
      PENDING_TOS
      REJECTED
      SOURCED
    }

    type ClientEngagementConnection {
      totalCount: Int!
    }

    input ClientEngagementFilter {
      """
      Filter by any engagement status (including previous statuses)
      """
      inStatusHistory: [EngagementStatus!]
    }

    input ClientFilter {
      accountClasses: [ClientAccountClass!]
      appliedOn: DateRange
      availableContacts: [ClientContact!]
      businessType: String
      claimable: Boolean
      claimerCategory: ClientClaimerCategory
      claimerId: ID
      clientPartnerCategory: ClientPartnerCategory
      clientPartnerId: ID
      contract: [ClientContract!]
      countryId: ID
      cumulativeStatuses: [ClientCumulativeStatus!]
      discountEligible: Boolean
      financeTeamMemberId: ID
      hasTestimonial: Boolean
      hierarchy: [ClientHierarchies!]
      inInvestigation: Boolean
      industry: String

      """
      Value in range 0..3
      """
      intentScore: [Int!]
      interestedIn: [String!]
      invoicingType: String
      jobStatuses: [ClientJobStatus!]

      """
      Value in range 1..3
      """
      leadPriorities: [Int!]
      ofacStatus: [OfacStatus!]
      parentClientId: ID

      """
      Value in range 0..5
      """
      ratings: [Int!]
      relationshipManagerId: ID
      salesCallPriority: ClientSalesCallPriority
      talentMatchers: [TalentMatcherInput!]
      tier: ClientTier
      timezones: TimezoneRangeFilter
    }

    enum ClientHierarchies {
      TOP_LEVEL_COMPANY
    }

    type ClientJobConnection {
      nodes: [Job!]!
      totalCount: Int!
      verticalsEngaged: [String!]!
    }

    input ClientJobFilter {
      statuses: [JobStatus!]
    }

    enum ClientJobStatus {
      ACTIVE
      CLOSED
      END_SCHEDULED
      NO_JOBS
      ON_BREAK
      ON_HOLD
      ON_TRIAL
      PENDING_CLAIM
      PENDING_ENGINEER
      PENDING_START
      POSTPONED
      REJECTED
      REMOVED
      SENDING_AWAY
    }

    type ClientLeadPotential {
      intent: LeadIntent!
      intentScoreUpdatedAt: Time
      lowOrNoIntent: Boolean!
      priority: LeadPriority!
    }

    type ClientMatcher implements Node @key(fields: "id") {
      id: ID!
      role: Staff!
      vertical: Vertical!
    }

    type ClientMatcherConnection {
      nodes: [ClientMatcher!]!
    }

    type ClientOperations {
      approveClient: Operation!
      blackFlagClient: Operation!
      claimClientEnterprise: Operation!
      createActivity: Operation!
      createClientClaimer: Operation!
      createMeeting: Operation!
      markClientAsBadLead: Operation!
      pauseClient: Operation!
      rejectClient: Operation!
      repauseClient: Operation!
      restoreClient: Operation!
      restoreClientFromBadLead: Operation!
      restoreClientFromBlackFlag: Operation!
      resumeClient: Operation!
      updateProfileClient: Operation!
    }

    enum ClientPartnerCategory {
      CORE
      PROSPECT
      SUPPORT
    }

    input ClientPurchaseOrderFilter {
      expired: Boolean
    }

    input ClientRepresentativeFilter {
      statuses: [RoleStatus!]
    }

    type ClientRepresentativesConnection {
      nodes: [CompanyRepresentative!]!
      totalCount: Int!
    }

    enum ClientSalesCallPriority {
      ANY
      HIGH
    }

    enum ClientSearchOrderField {
      ACTIVATED_AT
      CREATED_AT
      LAST_EDITED
      LAST_LOGIN
      LOCATION
      NAME
      RELEVANCE
      SALES_CALL_PRIORITY
    }

    """
    A type for sorting plural fields
    """
    input ClientSearchOrderFieldSortBy {
      order: SortOrderEnum!

      """
      Field to sort by
      """
      target: ClientSearchOrderField!
    }

    type ClientTestimonialsConnection {
      nodes: [Testimonial!]!
      totalCount: Int!
    }

    enum ClientTier {
      MID_TIER
      TIER_1
    }

    """
    Autogenerated input type of CollectBadDebtInvoice
    """
    input CollectBadDebtInvoiceInput {
      """
      A unique identifier for the client performing the mutation.
      """
      clientMutationId: String
      comment: String!
      feeAmount: BigDecimal!
      invoiceId: ID!
      transferAmount: BigDecimal!
    }

    """
    Autogenerated return type of CollectBadDebtInvoice
    """
    type CollectBadDebtInvoicePayload implements MutationResult {
      """
      A unique identifier for the client performing the mutation.
      """
      clientMutationId: String
      errors: [UserError!]!
      # invoice: Invoice
      notice: String
      success: Boolean!
    }

    type CommitmentRate {
      availability: CommitmentRateAvailability!
      value: BigDecimal!
    }

    enum CommitmentRateAvailability {
      HOUR
      WEEK
    }

    input CommunicationTrackingRolesFilter {
      emails: [String!]!
    }

    """
    Contains details about community events
    """
    type CommunityEvent implements Node & WebResource @key(fields: "id") {
      description: String!
      endDate: Date
      id: ID!
      location: Location!
      name: String!
      shortName: String!
      startDate: Date!
      typeformUrl: String!
      webResource: Link!
    }

    type CompanyRepresentative implements EmailCarbonCopyOptions & EmailTemplates & Node & RelatedTasksHolder & Role & Timezoned & WebResource
      @key(fields: "id") {
      """
      Not optimized. N+1. Use when necessary. Try to avoid call within connection.
      """
      applicationInfo: ApplicationInfo
      availableForMeeting(
        """
        Start Time in ISO8601 format (e.g. 2005-08-09T18:31:42)
        """
        from: Time!

        """
        End Time in ISO8601 format (e.g. 2005-08-09T18:31:42)
        """
        till: Time!
      ): Boolean!
      blankEmailTemplate: EmailTemplate
      citizenship: Country

      """
      decorated location's city with more descriptive address components
      """
      cityDescription: String
      client: Client!
      communicationTrackingToken(abilities: [String!]!): String!
      contacts(filter: ContactFilter): ContactConnection!
      currentSignInAt: Time
      currentSignInIp: String
      email: String!
      emailCarbonCopyOptions: EmailCarbonCopyOptionConnection
      emailPreview(body: String, title: String): EmailPreview
      emailRecipientName: String
      emailTemplates: EmailTemplateConnection!
      fullName: String!
      id: ID!
      invitedToLoginAt: Time
      ipLocation: Location!
      location: Location!
      main: Boolean
      notifyOther: Boolean
      ofacProhibited: Boolean!
      ofacStatus: OfacStatus!
      ofacStatusComment: String
      operations: CompanyRepresentativeOperations!
      ownedOperationalIssues(
        filter: RoleOwnedOperationalIssueFilter
        pagination: OffsetPagination!
      ): OperationalIssueOffsetConnection!
      photo: Photo
      position: String
      relatedTasks(
        filter: RelatedTasksFilter!
        pagination: OffsetPagination!
      ): RelatedTasksConnection
      scheduledMeetings: ScheduledMeetingsConnection!
      skype: String
      status: RoleStatus!
      timeZone: TimeZone

      """
      Platform domain-level category of the role. Semantically DIFFERENT from __typename
      """
      type: String!
      unresolvedOwnedOperationalIssuesCount: Int!
      userLegacyId: Int!
      viewerPendingCommunications: TaskSimpleConnection!
      webResource: Link!
    }

    type CompanyRepresentativeConnection {
      nodes: [CompanyRepresentative!]!
    }

    type CompanyRepresentativeContact implements Contact {
      category: String
      external: Boolean!
      id: ID!
      note: String
      operations: CompanyRepresentativeContactOperations!
      primary: Boolean!
      type: ContactType!
      value: String!
    }

    type CompanyRepresentativeContactOperations {
      callContact: Operation!
    }

    type CompanyRepresentativeOperations implements RoleOperations {
      createMeeting: Operation!
      inviteToLoginCompanyRepresentative: Operation!
    }

    """
    Autogenerated input type of CompleteMeeting
    """
    input CompleteMeetingInput {
      """
      A unique identifier for the client performing the mutation.
      """
      clientMutationId: String
      meetingId: ID!
    }

    """
    Autogenerated return type of CompleteMeeting
    """
    type CompleteMeetingPayload implements MutationResult {
      """
      A unique identifier for the client performing the mutation.
      """
      clientMutationId: String
      errors: [UserError!]!
      meeting: Meeting
      notice: String
      success: Boolean!
    }

    interface Contact {
      category: String
      id: ID!
      note: String
      primary: Boolean!
      type: ContactType!
      value: String!
    }

    type ContactConnection {
      nodes: [Contact!]!
    }

    input ContactFilter {
      type: [ContactType!]
    }

    enum ContactType {
      COMMUNITY_SLACK
      EMAIL
      PHONE
      PHONE_WITH_NOTES
      SKYPE
    }

    type Counter {
      name: String!
      operations: CountersOperation!
      total: Int!
      unread: Int!
    }

    type CounterConnection {
      nodes: [Counter!]!
    }

    type CountersOperation {
      touchCounter: Operation!
    }

    type Country implements Node @key(fields: "id") {
      id: ID!
      name: String
    }

    type CountryConnection {
      nodes: [Country!]!
    }

    """
    Autogenerated input type of CreateActivity
    """
    input CreateActivityInput {
      activityContactRoleIds: [ID!]

      """
      A unique identifier for the client performing the mutation.
      """
      clientMutationId: String
      details: String
      occurredAt: Time!

      """
      Depending on the type it is supposed to be one of *ActivityOutcome enum values
      """
      outcome: String!
      subjectId: ID!

      """
      Depending on the type it is supposed to be one of *ActivitySubtype enum values
      """
      subtype: String!
      title: String!
      type: ActivityType!
    }

    """
    Autogenerated return type of CreateActivity
    """
    type CreateActivityPayload implements MutationResult {
      activity: Activity

      """
      A unique identifier for the client performing the mutation.
      """
      clientMutationId: String
      errors: [UserError!]!
      notice: String
      success: Boolean!
    }

    """
    Autogenerated input type of CreateClientClaimer
    """
    input CreateClientClaimerInput {
      clientId: ID!

      """
      A unique identifier for the client performing the mutation.
      """
      clientMutationId: String
      clientProfile: Boolean
      startCallTimer: Boolean = true
    }

    """
    Autogenerated return type of CreateClientClaimer
    """
    type CreateClientClaimerPayload implements MutationResult {
      client: Client

      """
      A unique identifier for the client performing the mutation.
      """
      clientMutationId: String
      errors: [UserError!]!
      notice: String
      success: Boolean!
    }

    """
    Autogenerated input type of CreateEmailContact
    """
    input CreateEmailContactInput {
      """
      A unique identifier for the client performing the mutation.
      """
      clientMutationId: String
      email: String!
      roleId: ID!
    }

    """
    Autogenerated return type of CreateEmailContact
    """
    type CreateEmailContactPayload implements MutationResult {
      """
      A unique identifier for the client performing the mutation.
      """
      clientMutationId: String
      contact: RoleContact
      errors: [UserError!]!
      notice: String
      success: Boolean!
    }

    """
    Autogenerated input type of CreateGlobalTaskTag
    """
    input CreateGlobalTaskTagInput {
      """
      A unique identifier for the client performing the mutation.
      """
      clientMutationId: String
      name: String!
    }

    """
    Autogenerated return type of CreateGlobalTaskTag
    """
    type CreateGlobalTaskTagPayload implements MutationResult {
      """
      A unique identifier for the client performing the mutation.
      """
      clientMutationId: String
      errors: [UserError!]!
      notice: String
      success: Boolean!
      taskTag: TaskTag
    }

    """
    Autogenerated input type of CreateMeeting
    """
    input CreateMeetingInput {
      """
      A unique identifier for the client performing the mutation.
      """
      clientMutationId: String
      playbookTemplateId: ID
      roleOrClientId: ID!
    }

    """
    Autogenerated return type of CreateMeeting
    """
    type CreateMeetingPayload implements MutationResult {
      """
      A unique identifier for the client performing the mutation.
      """
      clientMutationId: String
      errors: [UserError!]!
      notice: String
      success: Boolean!
    }

    """
    Autogenerated input type of CreateNote
    """
    input CreateNoteInput {
      attachment: Upload

      """
      A unique identifier for the client performing the mutation.
      """
      clientMutationId: String
      comment: String!
      notableId: ID!
      title: String!
    }

    """
    Autogenerated return type of CreateNote
    """
    type CreateNotePayload implements MutationResult {
      """
      A unique identifier for the client performing the mutation.
      """
      clientMutationId: String
      errors: [UserError!]!
      note: Note
      notice: String
      success: Boolean!
    }

    """
    Autogenerated input type of CreatePersonalTaskTag
    """
    input CreatePersonalTaskTagInput {
      """
      A unique identifier for the client performing the mutation.
      """
      clientMutationId: String
      name: String!
    }

    """
    Autogenerated return type of CreatePersonalTaskTag
    """
    type CreatePersonalTaskTagPayload implements MutationResult {
      """
      A unique identifier for the client performing the mutation.
      """
      clientMutationId: String
      errors: [UserError!]!
      notice: String
      success: Boolean!
      taskTag: TaskTag
    }

    """
    Autogenerated input type of CreateTask
    """
    input CreateTaskInput {
      """
      A unique identifier for the client performing the mutation.
      """
      clientMutationId: String
      description: String!
      dueDate: Date
      performerId: ID!
      primaryTaskSubjectId: ID
      priority: TaskPriorityLevel
      recurringPeriod: Int
      source: TaskSource!
      tagIds: [ID!]
    }

    """
    Autogenerated return type of CreateTask
    """
    type CreateTaskPayload implements MutationResult {
      """
      A unique identifier for the client performing the mutation.
      """
      clientMutationId: String
      errors: [UserError!]!
      notice: String
      success: Boolean!
      task: Task
    }

    """
    Autogenerated input type of CreateTransferInvoice
    """
    input CreateTransferInvoiceInput {
      achProcessingDate: Date
      amount: BigDecimal
      billingOptionId: ID

      """
      A unique identifier for the client performing the mutation.
      """
      clientMutationId: String
      comment: String!
      date: Date
      invoiceId: ID!
      paymentMethod: InvoicePaymentMethods
      paymentSource: InvoicePaymentSources!
      pendingReceiptOn: Date
      pendingReceiptPaymentMethod: InvoicePendingReceiptPaymentMethods
      processingDate: Date
    }

    """
    Autogenerated return type of CreateTransferInvoice
    """
    type CreateTransferInvoicePayload implements MutationResult {
      """
      A unique identifier for the client performing the mutation.
      """
      clientMutationId: String
      errors: [UserError!]!
      # invoice: Invoice
      notice: String
      success: Boolean!
    }

    """
    Credit Card Billing Option

    Represents the option when client wants us to charge their CC.
    """
    type CreditCardBillingOption implements BillingOptionInterface {
      """
      The way money are sent to client

      Can be one of:
        - Wire
        - PayPal
        - Credit Card
        - ACH (also obsolete Manual and Automatic ACH)
      """
      billingMethod: BillingMethodName!

      """
      Show if credit card is expired
      """
      cardExpired: Boolean!
      discountValue: Int!
      discountable: Boolean!
      id: ID!

      """
      Last four digits of the CC number
      """
      last4Digits: String!
      name: String!

      """
      Credit Card provider, the brand
      """
      type: String!
    }

    enum CumulativeJobStatus {
      ACTIVE
      CLOSED
      DRAFTED_BY_SALES
      DRAFT_CONFIRMED
      DRAFT_UNCONFIRMED
      END_SCHEDULED
      ON_BREAK
      ON_HOLD
      ON_TRIAL
      PENDING_CLAIM
      PENDING_ENGINEER
      PENDING_LEGAL
      PENDING_START
      POSTPONED
      REJECTED
      REMOVED
      SENDING_AWAY
    }

    """
    Date expressed as iso8601 (no time, no zone)
    """
    scalar Date

    """
    Date filter
    """
    input DateRange {
      """
      Start date in ISO8601 format (e.g. 2019-03-20)
      """
      from: Date

      """
      End date in ISO8601 format (e.g. 2019-03-20)
      """
      till: Date
    }

    """
    Autogenerated input type of DestroyTaskTag
    """
    input DestroyTaskTagInput {
      """
      A unique identifier for the client performing the mutation.
      """
      clientMutationId: String
      taskTagId: ID!
    }

    """
    Autogenerated return type of DestroyTaskTag
    """
    type DestroyTaskTagPayload implements MutationResult {
      """
      A unique identifier for the client performing the mutation.
      """
      clientMutationId: String
      errors: [UserError!]!
      notice: String
      success: Boolean!
      taskTag: TaskTag
    }

    """
    Autogenerated input type of DisableBeta
    """
    input DisableBetaInput {
      """
      A unique identifier for the client performing the mutation.
      """
      clientMutationId: String
    }

    """
    Autogenerated return type of DisableBeta
    """
    type DisableBetaPayload implements MutationResult {
      """
      A unique identifier for the client performing the mutation.
      """
      clientMutationId: String
      errors: [UserError!]!
      notice: String
      success: Boolean!
      viewer: Viewer
    }

    """
    Autogenerated input type of DisputeTask
    """
    input DisputeTaskInput {
      """
      A unique identifier for the client performing the mutation.
      """
      clientMutationId: String
      comment: String!
      taskId: ID!
    }

    """
    Autogenerated return type of DisputeTask
    """
    type DisputeTaskPayload implements MutationResult {
      """
      A unique identifier for the client performing the mutation.
      """
      clientMutationId: String
      errors: [UserError!]!
      notice: String
      success: Boolean!
      task: Task
    }

    """
    Autogenerated input type of EditJobInvoiceNote
    """
    input EditJobInvoiceNoteInput {
      """
      A unique identifier for the client performing the mutation.
      """
      clientMutationId: String
      invoiceNote: String!
      jobId: ID!
    }

    """
    Autogenerated return type of EditJobInvoiceNote
    """
    type EditJobInvoiceNotePayload implements MutationResult {
      """
      A unique identifier for the client performing the mutation.
      """
      clientMutationId: String
      errors: [UserError!]!
      job: Job
      notice: String
      success: Boolean!
    }

    enum EmailActivityOutcome {
      RECEIVED
      SENT
    }

    enum EmailActivitySubtype {
      GENERATED_NOTIFICATION
      INBOUND
      OTHER
      OUTBOUND
    }

    type EmailCarbonCopyOption {
      label: String!
      role: Role!
    }

    type EmailCarbonCopyOptionConnection {
      nodes: [EmailCarbonCopyOption!]!
    }

    interface EmailCarbonCopyOptions {
      emailCarbonCopyOptions: EmailCarbonCopyOptionConnection
    }

    enum EmailDeliveryStatus {
      BOUNCE
      DEFERRED
      DELIVERED
      DROPPED
      MISSING
      PROCESSED
    }

    type EmailPreview {
      html: String
      title: String
    }

    type EmailTemplate implements Node @key(fields: "id") {
      id: ID!
      name: String!
      rawTemplate: String!
      rendered: EmailTemplateRendered
    }

    type EmailTemplateConnection {
      nodes: [EmailTemplate!]!
    }

    type EmailTemplateRendered {
      body: String!
      subject: String
    }

    interface EmailTemplates {
      blankEmailTemplate: EmailTemplate
      emailTemplates: EmailTemplateConnection!
    }

    """
    Autogenerated input type of EnableBeta
    """
    input EnableBetaInput {
      """
      A unique identifier for the client performing the mutation.
      """
      clientMutationId: String
    }

    """
    Autogenerated return type of EnableBeta
    """
    type EnableBetaPayload implements MutationResult {
      """
      A unique identifier for the client performing the mutation.
      """
      clientMutationId: String
      errors: [UserError!]!
      notice: String
      success: Boolean!
      viewer: Viewer
    }

    type Engagement implements Node & RelatedTasksHolder & Timezoned
      @key(fields: "id") {
      _gid: String!
      billCycle: BillCycle!
      billDay: WeekDay
      billingNetTerms: Int!
      canBeDiscounted: Boolean!
      changeDate: Date
      client: Client!
      commitment: EngagementCommitmentEnum!
      companyFullTimeRate: BigDecimal
      companyHourlyRate: BigDecimal
      companyPartTimeRate: BigDecimal
      createdAt: Time!
      cumulativeStatus: String!

      """
      Makes request to external Billing service
      """
      currentCommitment: AdjustedCommitment!
      currentEngagementBreak: EngagementBreak
      customRates: Boolean!
      defaultDiscount: Int!
      discountMultiplier: BigDecimal!
      endDate: Date
      engagementBreaks(
        filter: EngagementBreakFilter

        """
        Offset parameter for connection node.
        """
        pagination: OffsetPagination
        sort: EngagementBreakOrderFieldSortBy
      ): EngagementBreakConnection!
      engagementEndedFeedbackReason: FeedbackReason
      id: ID!
      interview: Interview
      interviews: InterviewConnection!
      isNew: Boolean!
      job: Job
      number: Int!
      onHoldStartDate: Date
      operations: EngagementOperations!
      postponedPerformedAction: PerformedAction
      projectedRevenue: BigDecimal
      rateModifier: Int
      rejectDate: Date
      relatedTasks(
        filter: RelatedTasksFilter!
        pagination: OffsetPagination!
      ): RelatedTasksConnection
      semiMonthlyPaymentTalentAgreement: Boolean!
      startDate: Date
      status: EngagementStatus!
      talent: Talent
      talentFullTimeRate: BigDecimal
      talentHourlyRate: BigDecimal
      talentPartTimeRate: BigDecimal
      timeZone: TimeZone
      tooltipStatus: EngagementTooltipStatus
      trialEndDate: Date
      trialLength: Int!
    }

    """
    A break in an engagement
    """
    type EngagementBreak implements Node & RelatedTasksHolder
      @key(fields: "id") {
      endDate: Time
      id: ID!
      relatedTasks(
        filter: RelatedTasksFilter!
        pagination: OffsetPagination!
      ): RelatedTasksConnection
      startDate: Time!
      status: EngagementBreakStatus!
    }

    type EngagementBreakConnection {
      nodes: [EngagementBreak!]!
      totalCount: Int!
    }

    input EngagementBreakFilter {
      statuses: [EngagementBreakStatus!]
    }

    enum EngagementBreakOrderField {
      START_DATE
    }

    """
    A type for sorting plural fields
    """
    input EngagementBreakOrderFieldSortBy {
      order: SortOrderEnum!

      """
      Field to sort by
      """
      target: EngagementBreakOrderField!
    }

    enum EngagementBreakStatus {
      REMOVED
      SCHEDULED
    }

    enum EngagementCommitmentEnum {
      FULL_TIME
      HOURLY
      PART_TIME
    }

    type EngagementConnection {
      nodes: [Engagement!]!
      totalCount: Int!
    }

    type EngagementOperations @key(fields: "_engagement { id }") {
      _engagement: Engagement!
      changeEngagementCommitment: Operation!
      scheduleEngagementBreak: Operation!
    }

    enum EngagementState {
      ASSIGNED_TALENT
      CANDIDATES
      CURRENT
    }

    enum EngagementStatus {
      ACTIVE
      CANCELLED
      CLOSED
      DRAFT
      END_SCHEDULED
      EXPIRATION_POSTPONED
      EXPIRED
      ON_BREAK
      ON_HOLD
      ON_TRIAL
      PENDING
      PENDING_APPROVAL
      PENDING_EXPIRATION
      PENDING_LEGAL
      READY_TO_SEND
      REJECTED_DRAFT
      REJECTED_INTERVIEW
      REJECTED_TRIAL
      REVIEWED
      SCHEDULED
    }

    enum EngagementTooltipStatus {
      NO_TOOLTIP
      POSTPONED_PERFORMED_ACTION_COMMENT
      TIMEZONE
      TIMEZONE_AND_FEEDBACK_ENGAGEMENT_ENDED
    }

    type ExpiredCallTimer {
      client: Client!
      id: ID!
    }

    type ExpiredCallTimerConnection {
      nodes: [ExpiredCallTimer!]!
    }

    type ExternalTaskSubject implements WebResource {
      title: String
      webResource: Link!
    }

    """
    Autogenerated input type of FailMeeting
    """
    input FailMeetingInput {
      """
      A unique identifier for the client performing the mutation.
      """
      clientMutationId: String
      comment: String
      meetingId: ID!
      outcome: MeetingOutcome!
    }

    """
    Autogenerated return type of FailMeeting
    """
    type FailMeetingPayload implements MutationResult {
      """
      A unique identifier for the client performing the mutation.
      """
      clientMutationId: String
      errors: [UserError!]!
      meeting: Meeting
      notice: String
      success: Boolean!
    }

    """
    Feedback reason
    """
    type FeedbackReason implements Node @key(fields: "id") {
      group: FeedbackReason
      id: ID!
      identifier: String!
      name: String!
    }

    enum FeedbackReasonActions {
      COMPANY_BLACK_FLAGGED
      COMPANY_MARKED_AS_BAD_LEAD
      COMPANY_PAUSED
      COMPANY_REMOVED
      ENGAGEMENT_PAUSED
      JOB_CANCELLED
    }

    type FeedbackReasonConnection {
      nodes: [FeedbackReason!]!
    }

    input FeedbackReasonFilter {
      action: FeedbackReasonActions!
    }

    """
    Autogenerated input type of FinishTask
    """
    input FinishTaskInput {
      """
      A unique identifier for the client performing the mutation.
      """
      clientMutationId: String
      taskId: ID!
    }

    """
    Autogenerated return type of FinishTask
    """
    type FinishTaskPayload implements MutationResult {
      """
      A unique identifier for the client performing the mutation.
      """
      clientMutationId: String
      errors: [UserError!]!
      notice: String
      success: Boolean!
      task: Task
    }

    type Flag {
      color: FlagColor
      id: ID!
      targetRole: String!
      title: String!
      token: String
    }

    enum FlagColor {
      GREEN
      ORANGE
      RED
    }

    type GraniteError implements UserError {
      code: String!
      key: String!
      message: String!
    }

    enum HowDidYouHearValues {
      A_TOPTALER
      A_TOPTAL_CUSTOMER
      A_TOPTAL_EMPLOYEE
      BILLBOARD_OR_OUTDOOR_AD
      BLOG_POST
      DISPLAY_AD
      EVENT
      FACEBOOK
      FACEBOOK_AD
      FRIEND_OR_COLLEAGUE
      HACKER_NEWS
      LINKEDIN
      LINKEDIN_AD
      NEWS_ARTICLE
      ONLINE_VIDEO
      OTHER
      PODCAST
      QUORA
      REDDIT
      SEARCH_ENGINE_AD
      SEARCH_ENGINE_RESULT
    }

    type InactivityRejectionDeadline {
      date: Date!
      id: ID!
    }

    type InactivityRejectionDeadlineConnection {
      nodes: [InactivityRejectionDeadline!]!
      totalCount: Int!
    }

    enum InactivityRejectionDeadlinesOrderField {
      DATE
    }

    """
    A type for sorting plural fields
    """
    input InactivityRejectionDeadlinesOrderFieldSortBy {
      order: SortOrderEnum!

      """
      Field to sort by
      """
      target: InactivityRejectionDeadlinesOrderField!
    }

    enum Industries {
      AGRICULTURE
      APPAREL_FASHION
      AUTOMOTIVE_MOBILITY
      BUSINESS_SERVICES
      CONSTRUCTION
      CONSUMER_PRODUCTS_SERVICES
      CONSUMER_SERVICES
      EDUCATION
      ENERGY_RESOURCES
      ENERGY_UTILITIES_WASTE
      FINANCE
      FINANCIAL_SERVICES
      FITNESS_WELLNESS
      GOVERNMENT
      GOVERNMENT_PUBLIC_SECTOR
      HEALTHCARE_SERVICES
      HOLDING_COMPANIES_CONGLOMERATES
      HOSPITALITY
      HOSPITALS_PHYSICIANS_CLINICS
      HUMAN_RESOURCES
      INDUSTRIAL_MANUFACTURING
      INSURANCE
      LAW_FIRMS_LEGAL_SERVICES
      LIFE_SCIENCES_HEALTHCARE
      MANUFACTURING
      MARKETING_ADVERTISING
      MEDIA_INTERNET
      MINERALS_MINING
      ORGANIZATIONS
      PROFESSIONAL_SERVICES
      REAL_ESTATE
      RETAIL
      SOFTWARE
      TECHNOLOGY
      TELECOMMUNICATIONS
      TELECOMMUNICATIONS_MEDIA_ENTERTAINMENT
      TRANSPORTATION
      TRAVEL_TRANSPORTATION_LOGISTICS
      UTILITIES
    }

    type Interview implements Node @key(fields: "id") {
      id: ID!
      interviewTime: Time
      scheduledAtTimes: [Time!]!
      status: InterviewStatus!
      verifierName: String!
    }

    type InterviewConnection {
      nodes: [Interview!]!
      totalCount: Int!
    }

    enum InterviewStatus {
      ACCEPTED
      MISSED
      PENDING
      REJECTED
      SCHEDULED
      TIME_ACCEPTED
      TIME_REJECTED
    }

    type Investigation {
      id: ID!
      startedAt: Time!
    }

    type InvestigationConnection {
      nodes: [Investigation!]!
    }

    input InvestigationsFilter {
      current: Boolean
    }

    """
    Autogenerated input type of InviteToLoginCompanyRepresentative
    """
    input InviteToLoginCompanyRepresentativeInput {
      """
      A unique identifier for the client performing the mutation.
      """
      clientMutationId: String
      companyRepresentativeId: ID!
    }

    """
    Autogenerated return type of InviteToLoginCompanyRepresentative
    """
    type InviteToLoginCompanyRepresentativePayload implements MutationResult {
      """
      A unique identifier for the client performing the mutation.
      """
      clientMutationId: String
      companyRepresentative: CompanyRepresentative
      errors: [UserError!]!
      notice: String
      success: Boolean!
    }

    # type Invoice implements Node & Notable & RelatedTasksHolder @extends @key(fields: "id") {
    #   client: Client!
    #   consolidatedInvoice: Invoice
    #   exceedsPurchaseOrderBalance: Boolean!
    #   id: ID! @external

    #   """
    #   The last time a status was updated for this invoice
    #   """
    #   lastStatusChangeAt: Time
    #   notes: NoteConnection
    #   notifications: InvoiceNotificationsStatusesConnection!
    #   relatedTasks(filter: RelatedTasksFilter!, pagination: OffsetPagination!): RelatedTasksConnection
    # }

    input InvoiceFilter {
      accessLevel: AccessLevelFilter!
      status: String!
    }

    type InvoiceNotificationStatus {
      description: String
      email: String!
      status: EmailDeliveryStatus!
    }

    type InvoiceNotificationsStatusesConnection {
      nodes: [InvoiceNotificationStatus!]!
      sentAt: Time
      unsentReason: String
    }

    enum InvoicePaymentMethods {
      CHECK
      PAYPAL
      WELLS_FARGO_WIRE
    }

    enum InvoicePaymentSources {
      ACH
      CREDIT_CARD
      PENDING_RECEIPT
      RECORD
    }

    enum InvoicePendingReceiptPaymentMethods {
      CHECK
      WELLS_FARGO_WIRE
    }

    input InvoicesOverviewFilter {
      accessLevel: AccessLevelFilter!
      sinceDate: String!
    }

    """
    Represents untyped JSON
    """
    scalar JSON

    type Job implements Node & Notable & RelatedTasksHolder & WebResource
      @key(fields: "id")
      @key(fields: "_engagementId")
      @key(fields: "_jobOrEngagementId") {
      _engagementId: Int
      _jobOrEngagementId: ID!
      applications(filter: JobApplicationFilter): JobApplicationConnection!
      autoConsolidationEnabled: Boolean!
      availabilityRequests: AvailabilityRequestConnection!
      availableSpecializations: SpecializationConnection!
      claimedAt: Time
      claimer: Staff
      claimerOrHandoff: Staff
      client: Client!
      commitment: String
      contacts: CompanyRepresentativeConnection!
      coreSkills: JobSkillsConnection!
      createdAt: Time
      cumulativeStatus: CumulativeJobStatus!
      currentInvestigation: Investigation
      currentTalents: TalentConnection!
      defaultSkillCategory: SkillCategory!
      description: String
      engagementEndedFeedbackReason: FeedbackReason
      engagements(
        filter: JobEngagementFilter
        pagination: OffsetPagination
      ): JobEngagementConnection
      estimatedLength: JobEstimatedLengths
      hiredCount: Int!
      id: ID!
      invoiceNote: String
      jobType: String!
      mainSkill: Skill
      matcherCallScheduled: Boolean!
      notes: NoteConnection
      operations: JobOperations!
      positionQuestions: JobPositionQuestionConnection!

      """
      Not optimized. N+1. Use when necessary.
      """
      possiblyRelatedMeetings: MeetingSimpleConnection!
      postedAt: Time
      purchaseOrder: PurchaseOrder
      relatedTasks(
        filter: RelatedTasksFilter!
        pagination: OffsetPagination!
      ): RelatedTasksConnection
      requiresMatchingCallInfo: Boolean!
      searchCandidatesUrl: String
      semiMonthlyBilling: Boolean
      sendCandidateUrl: String
      skills: JobSkillsEdgedConnection!
      skillsAutocomplete(
        filter: SkillsAutocompleteFilter!
        pagination: OffsetPagination!
      ): AutocompleteConnection!
      specialization: Specialization
      startDate: Date
      status: JobStatus!
      talentCount: Int!
      timeZonePreference: TimeZone
      title: String!
      totalHours: Float
      visibleAt: Time
      webResource: Link!
    }

    type JobApplicationConnection {
      totalCount: Int!
    }

    input JobApplicationFilter {
      statuses: [JobApplicationStatus!]
    }

    enum JobApplicationStatus {
      ACCEPTED
      CANCELLED
      PENDING
      POSITION_FULFILLED
      REJECTED
    }

    enum JobCommitment {
      FULL_TIME
      HOURLY
      PART_TIME
    }

    type JobConnection {
      nodes: [Job!]!
      totalCount: Int!
    }

    type JobEngagementConnection {
      nodes: [Engagement!]!
      totalCount: Int!
    }

    input JobEngagementFilter {
      state: EngagementState
    }

    enum JobEstimatedLengths {
      LENGTH_12_MONTHS
      LENGTH_1_2_WEEKS
      LENGTH_2_3_MONTHS
      LENGTH_2_4_WEEKS
      LENGTH_3_6_MONTHS
      LENGTH_4_8_WEEKS
      LENGTH_6_12_MONTHS
      LENGTH_UNKNOWN
    }

    input JobFilter {
      businessType: BusinessTypes
      claimer: SearchableNoneMeId
      commitments: [JobCommitment!]
      companyClaimer: SearchableNoneMeId
      cumulativeStatuses: [CumulativeJobStatus!]
      parentCompanyId: ID
      workTypes: [JobWorkType!]
    }

    type JobOperations {
      approveJob: Operation!
      editJobInvoiceNote: Operation!
      removeJob: Operation!
      resumePostponedJob: Operation!
    }

    type JobPositionQuestion implements Node @key(fields: "id") {
      id: ID!
      label: String!
    }

    type JobPositionQuestionConnection {
      nodes: [JobPositionQuestion!]!
    }

    input JobPositionQuestionInput {
      destroy: Boolean
      id: ID
      label: String!
    }

    type JobSimpleConnection {
      nodes: [Job!]!
    }

    type JobSkillsConnection {
      nodes: [Skill!]!
      totalCount: Int!
    }

    type JobSkillsEdgedConnection {
      edges: [SkillEdge!]!
      nodes: [Skill!]!
      totalCount: Int!
    }

    enum JobStatus {
      ACTIVE
      CLOSED
      DRAFTED_BY_SALES
      DRAFT_CONFIRMED
      DRAFT_UNCONFIRMED
      PENDING_CLAIM
      PENDING_ENGINEER
      POSTPONED
      REJECTED
      REMOVED
      SENDING_AWAY
    }

    enum JobWorkType {
      MIXED
      ONSITE
      RECRUITING
      REMOTE
    }

    """
    A generic type for dictionary lists, with key and value as string.
    Doesn't allow null values.
    """
    type KeyValueStrings {
      key: String!
      value: String!
    }

    """
    Possible lead intents.
    """
    enum LeadIntent {
      HIGH
      LOW
      MEDIUM
      PENDING
      UNKNOWN
    }

    """
    Possible lead priorities.
    """
    enum LeadPriority {
      AMBIGUOUS
      HIGH
      LOW
    }

    type Leader implements EmailCarbonCopyOptions & EmailTemplates & Node & Notable & RelatedTasksHolder & Role & Timezoned & WebResource
      @key(fields: "id") {
      """
      Not optimized. N+1. Use when necessary. Try to avoid call within connection.
      """
      applicationInfo: ApplicationInfo
      availableForMeeting(
        """
        Start Time in ISO8601 format (e.g. 2005-08-09T18:31:42)
        """
        from: Time!

        """
        End Time in ISO8601 format (e.g. 2005-08-09T18:31:42)
        """
        till: Time!
      ): Boolean!
      blankEmailTemplate: EmailTemplate
      citizenship: Country

      """
      decorated location's city with more descriptive address components
      """
      cityDescription: String
      communicationTrackingToken(abilities: [String!]!): String!
      contacts(filter: ContactFilter): ContactConnection!
      email: String!
      emailCarbonCopyOptions: EmailCarbonCopyOptionConnection
      emailPreview(body: String, title: String): EmailPreview
      emailRecipientName: String
      emailTemplates: EmailTemplateConnection!
      fullName: String!
      id: ID!
      location: Location!
      notes: NoteConnection
      ofacProhibited: Boolean!
      ofacStatus: OfacStatus!
      ofacStatusComment: String
      operations: LeaderOperations!
      ownedOperationalIssues(
        filter: RoleOwnedOperationalIssueFilter
        pagination: OffsetPagination!
      ): OperationalIssueOffsetConnection!
      photo: Photo
      relatedTasks(
        filter: RelatedTasksFilter!
        pagination: OffsetPagination!
      ): RelatedTasksConnection
      scheduledMeetings: ScheduledMeetingsConnection!
      skype: String
      timeZone: TimeZone

      """
      Platform domain-level category of the role. Semantically DIFFERENT from __typename
      """
      type: String!
      unresolvedOwnedOperationalIssuesCount: Int!
      userLegacyId: Int!
      viewerPendingCommunications: TaskSimpleConnection!
      webResource: Link!
    }

    type LeaderOperations implements RoleOperations {
      createMeeting: Operation!
    }

    """
    Web resource link
    """
    type Link {
      text: String!
      url: String
    }

    type Location {
      cityName: String
      countryName: String
      stateName: String
    }

    input LocationInput {
      city: String
      countryId: ID
      placeId: String
    }

    enum LogicOperator {
      AND
      OR
    }

    """
    Autogenerated input type of Logout
    """
    input LogoutInput {
      """
      A unique identifier for the client performing the mutation.
      """
      clientMutationId: String
    }

    """
    Autogenerated return type of Logout
    """
    type LogoutPayload implements MutationResult {
      """
      A unique identifier for the client performing the mutation.
      """
      clientMutationId: String
      errors: [UserError!]!
      notice: String
      returnTo: String!
      success: Boolean!
    }

    """
    Autogenerated input type of MarkClientAsBadLead
    """
    input MarkClientAsBadLeadInput {
      clientId: ID!

      """
      A unique identifier for the client performing the mutation.
      """
      clientMutationId: String
      comment: String!

      """
      FeedbackReason id with COMPANY_MARKED_AS_BAD_LEAD action
      """
      reasonId: ID!
    }

    """
    Autogenerated return type of MarkClientAsBadLead
    """
    type MarkClientAsBadLeadPayload implements MutationResult {
      client: Client

      """
      A unique identifier for the client performing the mutation.
      """
      clientMutationId: String
      errors: [UserError!]!
      notice: String
      success: Boolean!
    }

    type MasterBookingPageConfiguration implements Node & RelatedTasksHolder
      @key(fields: "id") {
      id: ID!
      relatedTasks(
        filter: RelatedTasksFilter!
        pagination: OffsetPagination!
      ): RelatedTasksConnection
      title: String!
    }

    type Meeting implements Node & RelatedTasksHolder & WebResource
      @key(fields: "id") {
      additionalInformation: String
      attendee: RoleOrClient

      """
      Attendee email when attendee is unknown (is nil)
      """
      attendeeEmail: String

      """
      Attendee name when attendee is unknown (is nil)
      """
      attendeeName: String
      callbackRequest: CallbackRequest
      comment: String
      conferenceUrl: String
      currentScheduler: MeetingScheduler
      durationMinutes: Int!
      id: ID!
      masterBookingPage: MasterBookingPageConfiguration
      moderationUrl: String
      operations: MeetingOperations!
      organizer: RoleOrClient!
      outcome: MeetingOutcome
      pendingJobs: JobSimpleConnection
      possibleSchedulersForBecomeOrganizer: MeetingSchedulerConnection!
      possibleSchedulersForTransfer: MeetingSchedulerConnection!
      relatedJob: Job
      relatedTasks(
        filter: RelatedTasksFilter!
        pagination: OffsetPagination!
      ): RelatedTasksConnection
      relatedToRoleStep: RoleStep
      scheduledAt: Time!
      scheduledVia: MeetingScheduledVia!
      skype: String
      status: MeetingStatus!
      subject: String!
      webResource: Link!
    }

    enum MeetingActivityOutcome {
      CANCELLED
      COMPLETED
      NO_SHOW
      OTHER
      RESCHEDULED
    }

    enum MeetingActivitySubtype {
      ACCOUNT_MANAGEMENT
      FOLLOW_UP
      INVESTIGATION
      JOB_MANAGEMENT
      LEGAL_BILLING
      MATCHING_CALL
      ONSITE
      OTHER
      SALES_CALL
    }

    type MeetingConnection {
      nodes: [Meeting!]!
      totalCount: Int!
    }

    input MeetingFilter {
      ids: [ID!]
      periods: [MeetingPeriodEnum!]!
    }

    type MeetingOperations {
      assignMeetingAttendee: Operation!
      becomeMeetingOrganizer: Operation!
      cancelMeeting: Operation!
      completeMeeting: Operation!
      failMeeting: Operation!
      removeMeeting: Operation!
      transferMeeting: Operation!
    }

    enum MeetingOutcome {
      CANCELLED_BY_HOST
      NO_SHOW
      OTHER
      RESCHEDULING_REQUIRED
    }

    enum MeetingPeriodEnum {
      future
      today
      unresolved
    }

    enum MeetingScheduledVia {
      BOOKING_PAGE
      CALL_REQUEST
      MASTER_BOOKING_PAGE
      UNKNOWN
    }

    type MeetingScheduler implements Node @key(fields: "id") {
      code: String!
      id: ID!
      role: RoleOrClient!
    }

    type MeetingSchedulerConnection {
      nodes: [MeetingScheduler!]!
    }

    type MeetingSimpleConnection {
      nodes: [Meeting!]!
    }

    enum MeetingStatus {
      CANCELLED
      CANCELLED_BY_DEFAULT
      COMPLETED
      FAILED
      FINISHED
      ORGANIZER_CHANGED
      REMOVED
      RESCHEDULED
      SCHEDULED
      STARTED
    }

    type MentorApplication implements Node & WebResource @key(fields: "id") {
      id: ID!
      title: String
      webResource: Link!
    }

    type Menu {
      mainMenu: [MenuItem!]!
      userMenu: [MenuItem!]!
    }

    type MenuItem {
      counter: String
      items: [MenuItem!]!
      label: String!
      minimumSubitems: Int
      path: String
    }

    enum MessagingActivityOutcome {
      MEETING_SCHEDULED
      MESSAGE_SENT
      NO_REPLY
      OTHER
    }

    enum MessagingActivitySubtype {
      LINKEDIN
      OTHER
      SKYPE
      SLACK
      SMS
      WHATSAPP
    }

    """
    The mutation root of staff portal schema
    """
    type Mutation {
      acceptTaskDispute(
        input: AcceptTaskDisputeInput!
      ): AcceptTaskDisputePayload
      addTaskComment(input: AddTaskCommentInput!): AddTaskCommentPayload
      addTaskTag(input: AddTaskTagInput!): AddTaskTagPayload
      addTaskWatcher(input: AddTaskWatcherInput!): AddTaskWatcherPayload
      approveClient(input: ApproveClientInput!): ApproveClientPayload
      approveJob(input: ApproveJobInput!): ApproveJobPayload
      approveOperationalIssue(
        input: ApproveOperationalIssueInput!
      ): ApproveOperationalIssuePayload
      assignMeetingAttendee(
        input: AssignMeetingAttendeeInput!
      ): AssignMeetingAttendeePayload
      becomeMeetingOrganizer(
        input: BecomeMeetingOrganizerInput!
      ): BecomeMeetingOrganizerPayload
      blackFlagClient(input: BlackFlagClientInput!): BlackFlagClientPayload
      callContact(input: CallContactInput!): CallContactPayload
      cancelMeeting(input: CancelMeetingInput!): CancelMeetingPayload
      cancelTask(input: CancelTaskInput!): CancelTaskPayload
      cancelTaskDispute(
        input: CancelTaskDisputeInput!
      ): CancelTaskDisputePayload
      changeEngagementCommitment(
        input: ChangeEngagementCommitmentInput!
      ): ChangeEngagementCommitmentPayload
      changeTaskPriority(
        input: ChangeTaskPriorityInput!
      ): ChangeTaskPriorityPayload
      changeTaskRecurringPeriod(
        input: ChangeTaskRecurringPeriodInput!
      ): ChangeTaskRecurringPeriodPayload
      claimCallbackRequest(
        input: ClaimCallbackRequestInput!
      ): ClaimCallbackRequestPayload
      claimClientEnterprise(
        input: ClaimClientEnterpriseInput!
      ): ClaimClientEnterprisePayload
      claimOperationalIssue(
        input: ClaimOperationalIssueInput!
      ): ClaimOperationalIssuePayload
      completeMeeting(input: CompleteMeetingInput!): CompleteMeetingPayload
      createActivity(input: CreateActivityInput!): CreateActivityPayload
      createClientClaimer(
        input: CreateClientClaimerInput!
      ): CreateClientClaimerPayload
      createEmailContact(
        input: CreateEmailContactInput!
      ): CreateEmailContactPayload
      createGlobalTaskTag(
        input: CreateGlobalTaskTagInput!
      ): CreateGlobalTaskTagPayload
      createMeeting(input: CreateMeetingInput!): CreateMeetingPayload
      createNote(input: CreateNoteInput!): CreateNotePayload
      createPersonalTaskTag(
        input: CreatePersonalTaskTagInput!
      ): CreatePersonalTaskTagPayload
      createTask(input: CreateTaskInput!): CreateTaskPayload
      destroyTaskTag(input: DestroyTaskTagInput!): DestroyTaskTagPayload
      disableBeta(input: DisableBetaInput!): DisableBetaPayload
      disputeTask(input: DisputeTaskInput!): DisputeTaskPayload
      editJobInvoiceNote(
        input: EditJobInvoiceNoteInput!
      ): EditJobInvoiceNotePayload
      enableBeta(input: EnableBetaInput!): EnableBetaPayload
      failMeeting(input: FailMeetingInput!): FailMeetingPayload
      finishTask(input: FinishTaskInput!): FinishTaskPayload
      inviteToLoginCompanyRepresentative(
        input: InviteToLoginCompanyRepresentativeInput!
      ): InviteToLoginCompanyRepresentativePayload
      logout(input: LogoutInput!): LogoutPayload
      markClientAsBadLead(
        input: MarkClientAsBadLeadInput!
      ): MarkClientAsBadLeadPayload
      pauseClient(input: PauseClientInput!): PauseClientPayload
      reassignTask(input: ReassignTaskInput!): ReassignTaskPayload
      rejectClient(input: RejectClientInput!): RejectClientPayload
      removeCallbackRequest(
        input: RemoveCallbackRequestInput!
      ): RemoveCallbackRequestPayload
      removeJob(input: RemoveJobInput!): RemoveJobPayload
      removeMeeting(input: RemoveMeetingInput!): RemoveMeetingPayload
      removeNote(input: RemoveNoteInput!): RemoveNotePayload
      removeNoteAttachment(
        input: RemoveNoteAttachmentInput!
      ): RemoveNoteAttachmentPayload

      """
      Share authorization with TaskOperations.changeTaskRecurringPeriod
      """
      removeTaskRecurringPeriod(
        input: RemoveTaskRecurringPeriodInput!
      ): RemoveTaskRecurringPeriodPayload
      removeTaskTag(input: RemoveTaskTagInput!): RemoveTaskTagPayload
      removeTaskWatcher(
        input: RemoveTaskWatcherInput!
      ): RemoveTaskWatcherPayload
      reopenOperationalIssue(
        input: ReopenOperationalIssueInput!
      ): ReopenOperationalIssuePayload
      repauseClient(input: RepauseClientInput!): RepauseClientPayload
      rescheduleTask(input: RescheduleTaskInput!): RescheduleTaskPayload
      resolveOperationalIssue(
        input: ResolveOperationalIssueInput!
      ): ResolveOperationalIssuePayload
      restartTask(input: RestartTaskInput!): RestartTaskPayload
      restoreClient(input: RestoreClientInput!): RestoreClientPayload
      restoreClientFromBadLead(
        input: RestoreClientFromBadLeadInput!
      ): RestoreClientFromBadLeadPayload
      restoreClientFromBlackFlag(
        input: RestoreClientFromBlackFlagInput!
      ): RestoreClientFromBlackFlagPayload
      resumeClient(input: ResumeClientInput!): ResumeClientPayload
      resumePostponedJob(
        input: ResumePostponedJobInput!
      ): ResumePostponedJobPayload

      """
      Schedule a break in an engagement
      """
      scheduleEngagementBreak(
        input: ScheduleEngagementBreakInput!
      ): ScheduleEngagementBreakPayload
      sendEmailTo(input: SendEmailToInput!): SendEmailToPayload
      starTask(input: StarTaskInput!): StarTaskPayload
      touchCounter(input: TouchCounterInput!): TouchCounterPayload
      transferMeeting(input: TransferMeetingInput!): TransferMeetingPayload
      updateActivity(input: UpdateActivityInput!): UpdateActivityPayload
      updateNote(input: UpdateNoteInput!): UpdateNotePayload
      updateProfileClient(
        input: UpdateProfileClientInput!
      ): UpdateProfileClientPayload
      updateProfileStaff(
        input: UpdateProfileStaffInput!
      ): UpdateProfileStaffPayload
      updateTaskDescription(
        input: UpdateTaskDescriptionInput!
      ): UpdateTaskDescriptionPayload
      updateTaskTag(input: UpdateTaskTagInput!): UpdateTaskTagPayload
      updateViewerTimeZone(
        input: UpdateViewerTimeZoneInput!
      ): UpdateViewerTimeZonePayload
      verifyOperationalIssue(
        input: VerifyOperationalIssueInput!
      ): VerifyOperationalIssuePayload
    }

    """
    The result of the mutation
    """
    interface MutationResult {
      errors: [UserError!]!
      notice: String
      success: Boolean!
    }

    """
    An object with an ID.
    """
    interface Node {
      """
      ID of the object.
      """
      id: ID!
    }

    interface Notable {
      notes: NoteConnection
    }

    type Note implements Node @key(fields: "id") {
      answers: NoteAnswerConnection!
      attachment: NoteAttachment
      comment: String
      createdAt: Time!
      creator: Role
      id: ID!
      newSalesCall: Boolean!
      operations: NoteOperations!
      screeningCall: Boolean!
      title: String!
      updatedAt: Time!
    }

    type NoteAnswer {
      comment: String
      question: NoteQuestion!

      """
      Answer value. Depending on the question, some answers may have multiple values,
      e.g. ["B2B", "B2C", "Marketplace"]. In order to simplify things, we return
      an array of Strings as a value. In most cases it will be a one-element array.
      """
      value: [String!]
    }

    type NoteAnswerConnection {
      nodes: [NoteAnswer!]!
    }

    type NoteAttachment {
      identifier: String
      url: String!
    }

    type NoteConnection {
      nodes: [Note!]!
      operations: NoteConnectionOperations!
    }

    type NoteConnectionOperations {
      createNote: Operation!
    }

    type NoteOperations {
      removeNote: Operation!
      removeNoteAttachment: Operation!
      updateNote: Operation!
    }

    type NoteQuestion {
      kind: NoteQuestionKind!
      label: String!
    }

    enum NoteQuestionKind {
      BUSINESS
      DATE
      FILTERED_SKILL
      FREELANCE_PLATFORMS
      INDUSTRY
      INTEGER
      MULTIPLE_SKILLS
      RADIO_BUTTONS
      RADIO_BUTTONS_WITH_SKILL
      SELECT
      SKILL
      STRING
      TEXTBOX
      TIMEZONE
      YEAR
    }

    enum OfacStatus {
      INVESTIGATION
      NORMAL
      RESTRICTED
    }

    """
    A type for sorting plural fields
    """
    input OffsetPagination {
      """
      Limit number of results
      """
      limit: Int!

      """
      Offset for results
      """
      offset: Int!
    }

    type Operation {
      callable: OperationCallableTypes!
      messages: [String!]!
    }

    """
    Possible callable types for operation
    """
    enum OperationCallableTypes {
      DISABLED
      ENABLED
      HIDDEN
    }

    type OperationalIssue implements Node & WebResource @key(fields: "id") {
      """
      Decorated description. NOTE this fields has N+1
      """
      description(
        """
        Flag render links in the description, like the subject profile
        """
        includeLinks: Boolean = false
      ): String!
      id: ID!
      lastTimeOccurredAt: Time!
      occurrencesCount: Int!
      operations: OperationalIssueOperations!
      template: OperationalIssueTemplate!
      testing: Boolean!
      title: String!
      webResource: Link!
    }

    type OperationalIssueCauseTemplate implements Node @key(fields: "id") {
      id: ID!
      name: String!
    }

    type OperationalIssueCauseTemplateConnection {
      nodes: [OperationalIssueCauseTemplate!]!
    }

    type OperationalIssueConnection {
      counters: OperationalIssueCounters!
      nodes: [OperationalIssue!]!
      totalCount: Int!
    }

    type OperationalIssueCounters {
      all: Int
      escalated: Int
      mine: Int!
      team: Int
    }

    input OperationalIssueFilter {
      ownedBy: OperationalIssueOwnedBy!
    }

    type OperationalIssueOffsetConnection {
      nodes: [OperationalIssue!]!
      totalCount: Int!
    }

    type OperationalIssueOperations {
      approveOperationalIssue: Operation!
      claimOperationalIssue: Operation!
      reopenOperationalIssue: Operation!
      resolveOperationalIssue: Operation!
      verifyOperationalIssue: Operation!
    }

    """
    Possible OwnedBy types for operational issue
    """
    enum OperationalIssueOwnedBy {
      ALL
      ME
      TEAM
    }

    type OperationalIssueTemplate implements Node @key(fields: "id") {
      enabledCauses: OperationalIssueCauseTemplateConnection!
      id: ID!
      name: String
      recommendedSolutions: String
    }

    type OperationalIssuesStaffTreeCardNode {
      issuesCount: Int

      """
      An index of the parent node in the list
      """
      parentIndex: Int
      positions: [String!]!
      role: Role!
    }

    union OperationalIssuesStaffTreeNode =
        OperationalIssuesStaffTreeCardNode
      | OperationalIssuesStaffTreeTeamNode

    type OperationalIssuesStaffTreeNodeConnection {
      nodes: [OperationalIssuesStaffTreeNode!]!
    }

    type OperationalIssuesStaffTreeTeamMemberEdge {
      issuesCount: Int
      node: Role!
    }

    type OperationalIssuesStaffTreeTeamMembersConnection {
      edges: [OperationalIssuesStaffTreeTeamMemberEdge!]!
    }

    type OperationalIssuesStaffTreeTeamNode {
      members: OperationalIssuesStaffTreeTeamMembersConnection!
      name: String!

      """
      An index of the parent node in the list
      """
      parentIndex: Int
    }

    type Opportunity implements Node & WebResource @key(fields: "id") {
      id: ID!
      name: String
      webResource: Link!
    }

    """
    This is a technical workaround for keeping enums not used directly in schema
    """
    type OrphanEnums {
      callActivityOutcomes: [CallActivityOutcome!]!
      callActivitySubtypes: [CallActivitySubtype!]!
      emailActivityOutcomes: [EmailActivityOutcome!]!
      emailActivitySubtypes: [EmailActivitySubtype!]!
      meetingActivityOutcomes: [MeetingActivityOutcome!]!
      meetingActivitySubtypes: [MeetingActivitySubtype!]!
      messagingActivityOutcomes: [MessagingActivityOutcome!]!
      messagingActivitySubtypes: [MessagingActivitySubtype!]!
      otherActivityOutcomes: [OtherActivityOutcome!]!
      otherActivitySubtypes: [OtherActivitySubtype!]!
    }

    enum OtherActivityOutcome {
      COMPLETE
    }

    enum OtherActivitySubtype {
      INTERNAL_SYNC
      OTHER
    }

    """
    Common billing option
    """
    type OtherBillingOption implements BillingOptionInterface {
      """
      The way money are sent to client

      Can be one of:
        - Wire
        - PayPal
        - Credit Card
        - ACH (also obsolete Manual and Automatic ACH)
      """
      billingMethod: BillingMethodName!
      discountValue: Int!
      discountable: Boolean!
      id: ID!
      name: String!
    }

    type Overview {
      _roleManagedCompanyGids: [ID!]!
      _roleManagedEngagements: [Engagement!]!
      _teamManagedCompanyGids: [ID!]!
      _teamManagedEngagements: [Engagement!]!
      purchaseOrders(
        filter: PurchaseOrderFilter!
        pagination: OffsetPagination!
        sort: SortBy!
      ): PurchaseOrderConnection
    }

    """
    Autogenerated input type of PauseClient
    """
    input PauseClientInput {
      clientId: ID!

      """
      A unique identifier for the client performing the mutation.
      """
      clientMutationId: String
      comment: String!
      description: String
      dueDate: Date!
      priority: TaskPriorityLevel

      """
      FeedbackReason id with COMPANY_PAUSED action
      """
      reasonId: ID!
      tagIds: [ID!]
    }

    """
    Autogenerated return type of PauseClient
    """
    type PauseClientPayload implements MutationResult {
      client: Client

      """
      A unique identifier for the client performing the mutation.
      """
      clientMutationId: String
      errors: [UserError!]!
      notice: String
      success: Boolean!
    }

    # type Payment @extends @key(fields: "id") {
    #   id: ID! @external
    # }

    type PerformedAction {
      comment: String
      occurredAt: Date!
    }

    type Permits {
      handleRoleMetrics: Boolean!
      overridesOfacFilter: Boolean!
    }

    """
    A set of urls for different photo versions
    """
    type Photo {
      """
      226x226
      """
      default: String

      """
      1000x1000
      """
      huge: String

      """
      36x36
      """
      icon: String

      """
      380x380
      """
      large: String

      """
      289x289
      """
      skillPageAvatar: String

      """
      150x150
      """
      small: String

      """
      52x52
      """
      thumb: String
    }

    type PlaybookTaskConnection {
      nodes: [Task!]!
      overdueKpiChartDataUrl: String!
      teamCounters: TasksCounters!
      totalCount: Int!
      viewerCounters: TasksCounters!
    }

    type PlaybookTemplate implements Node & WebResource @key(fields: "id") {
      allowedForViewer: Boolean!
      finishDisabled: Boolean!
      id: ID!
      identifier: String!
      playbookName: String!
      webResource: Link!
    }

    type Promotion {
      score: Int
      updatedAt: Time
    }

    type PromotionConnection {
      nodes: [Promotion!]!
      totalCount: Int!
    }

    input PromotionFilter {
      statuses: [PromotionStatus!]
    }

    enum PromotionOrderField {
      UPDATED_AT
    }

    """
    A type for sorting plural fields
    """
    input PromotionOrderFieldSortBy {
      order: SortOrderEnum!

      """
      Field to sort by
      """
      target: PromotionOrderField!
    }

    enum PromotionStatus {
      ANSWERED
      PENDING
      REJECTED
    }

    type PurchaseOrder implements Node & RelatedTasksHolder & WebResource
      @key(fields: "id") {
      budgetLeft: BigDecimal
      budgetSpent: Boolean!
      client: Client!
      expiryDate: Date
      id: ID!
      invoicedAmount: BigDecimal!
      number: Int!
      poNumber: String!
      relatedTasks(
        filter: RelatedTasksFilter!
        pagination: OffsetPagination!
      ): RelatedTasksConnection
      threshold: BigDecimal
      totalAmount: BigDecimal
      webResource: Link!
    }

    type PurchaseOrderConnection {
      nodes: [PurchaseOrder!]!
    }

    input PurchaseOrderFilter {
      accessLevel: AccessLevelFilter!
      type: PurchaseOrderTypeFilter
    }

    """
    Filters purchase orders by:
      - expirable: with non-empty expiryDate
      - withAmount: with non-empty totalAmount
    """
    scalar PurchaseOrderTypeFilter

    """
    The query root of staff portal schema
    """
    type Query {
      """
      A list of autocomplete Nodes.
      """
      autocomplete(
        filter: AutocompleteFilter!
        pagination: OffsetPagination!
      ): AutocompleteConnection!
      billingMethods: [BillingMethod!]!
      callbackRequests(
        filter: CallbackFilter!

        """
        Offset parameter for connection node.
        """
        pagination: OffsetPagination!
        sort: SortBy
      ): CallbackRequestConnection
      clientApplicants(
        """
        Offset parameter for connection node.
        """
        pagination: OffsetPagination!
      ): ClientApplicantConnection
      clients(
        filter: ClientFilter!

        """
        Offset parameter for connection node.
        """
        pagination: OffsetPagination!
        sort: ClientSearchOrderFieldSortBy!
      ): ClientConnection
      communicationTrackingRoles(
        filter: CommunicationTrackingRolesFilter!
      ): RoleOrClientNullableSimpleConnection!
      countries: CountryConnection!
      engagement(number: Int!): Engagement
      engagements(
        """
        Offset parameter for connection node.
        """
        pagination: OffsetPagination!
        sort: SortBy
      ): EngagementConnection

      """
      A list of reasons for passed action.
      """
      feedbackReasons(filter: FeedbackReasonFilter!): FeedbackReasonConnection!
      globalCommunicationTrackingToken(abilities: [String!]!): String!
      jobLongshotReasons: [String!]!
      jobPositionQuestionTemplates: [String!]!
      jobs(filter: JobFilter, pagination: OffsetPagination!): JobConnection!
      menus: Menu!
      operationalIssues(
        filter: OperationalIssueFilter!
        pagination: OffsetPagination!
      ): OperationalIssueConnection!
      operationalIssuesStaffTree: OperationalIssuesStaffTreeNodeConnection!
      operations: QueryOperations!
      orphanEnums: OrphanEnums!
      overview: Overview!
      roles(filter: RoleFilter!): StaffConnection!
      taskTags(filter: TaskTagFilter!): TaskTagConnection!
      tasks(
        filter: TaskFilter!

        """
        Offset parameter for connection node.
        """
        pagination: OffsetPagination!
        sort: SortBy
      ): TaskConnection!
      verticals(filter: VerticalsFilter): VerticalConnection!
      viewer: Viewer!
    }

    type QueryOperations @key(fields: "_id") {
      """
      For internal use only (used for stitching the type)
      """
      _id: ID!
      createEmailContact: Operation!
      createGlobalTaskTag: Operation!
      createPersonalTaskTag: Operation!
      createTask: Operation!
    }

    type QuizItem {
      questionLabel: String!
      readableValue: [String!]!
    }

    type QuizItemConnection {
      nodes: [QuizItem!]!
    }

    """
    Range filter
    """
    input Range {
      from: Int
      to: Int
    }

    """
    Autogenerated input type of ReassignTask
    """
    input ReassignTaskInput {
      """
      A unique identifier for the client performing the mutation.
      """
      clientMutationId: String
      comment: String
      roleId: ID!
      taskId: ID!
    }

    """
    Autogenerated return type of ReassignTask
    """
    type ReassignTaskPayload implements MutationResult {
      """
      A unique identifier for the client performing the mutation.
      """
      clientMutationId: String
      errors: [UserError!]!
      notice: String
      success: Boolean!
      task: Task
    }

    type ReferralPartner implements EmailCarbonCopyOptions & EmailTemplates & Node & RelatedTasksHolder & Role & Timezoned & WebResource
      @key(fields: "id") {
      """
      Not optimized. N+1. Use when necessary. Try to avoid call within connection.
      """
      applicationInfo: ApplicationInfo
      availableForMeeting(
        """
        Start Time in ISO8601 format (e.g. 2005-08-09T18:31:42)
        """
        from: Time!

        """
        End Time in ISO8601 format (e.g. 2005-08-09T18:31:42)
        """
        till: Time!
      ): Boolean!
      blankEmailTemplate: EmailTemplate
      citizenship: Country

      """
      decorated location's city with more descriptive address components
      """
      cityDescription: String
      communicationTrackingToken(abilities: [String!]!): String!
      contacts(filter: ContactFilter): ContactConnection!
      email: String!
      emailCarbonCopyOptions: EmailCarbonCopyOptionConnection
      emailPreview(body: String, title: String): EmailPreview
      emailRecipientName: String
      emailTemplates: EmailTemplateConnection!
      fullName: String!
      id: ID!
      location: Location!
      ofacProhibited: Boolean!
      ofacStatus: OfacStatus!
      ofacStatusComment: String
      operations: ReferralPartnerOperations!
      ownedOperationalIssues(
        filter: RoleOwnedOperationalIssueFilter
        pagination: OffsetPagination!
      ): OperationalIssueOffsetConnection!
      photo: Photo
      relatedTasks(
        filter: RelatedTasksFilter!
        pagination: OffsetPagination!
      ): RelatedTasksConnection
      scheduledMeetings: ScheduledMeetingsConnection!
      skype: String
      timeZone: TimeZone

      """
      Platform domain-level category of the role. Semantically DIFFERENT from __typename
      """
      type: String!
      unresolvedOwnedOperationalIssuesCount: Int!
      userLegacyId: Int!
      viewerPendingCommunications: TaskSimpleConnection!
      webResource: Link!
    }

    type ReferralPartnerOperations implements RoleOperations {
      createMeeting: Operation!
    }

    """
    Autogenerated input type of RejectClient
    """
    input RejectClientInput {
      clientId: ID!

      """
      A unique identifier for the client performing the mutation.
      """
      clientMutationId: String
      comment: String!

      """
      FeedbackReason id with COMPANY_REMOVED action
      """
      reasonId: ID!
    }

    """
    Autogenerated return type of RejectClient
    """
    type RejectClientPayload implements MutationResult {
      client: Client

      """
      A unique identifier for the client performing the mutation.
      """
      clientMutationId: String
      errors: [UserError!]!
      notice: String
      success: Boolean!
    }

    type RelatedTasksConnection {
      completedCount: Int!
      nodes: [Task!]!
      totalCount: Int!
    }

    input RelatedTasksFilter {
      completed: Boolean
    }

    interface RelatedTasksHolder {
      relatedTasks(
        filter: RelatedTasksFilter!
        pagination: OffsetPagination!
      ): RelatedTasksConnection
    }

    """
    Autogenerated input type of RemoveCallbackRequest
    """
    input RemoveCallbackRequestInput {
      callbackRequestId: ID!

      """
      A unique identifier for the client performing the mutation.
      """
      clientMutationId: String
      comment: String!
    }

    """
    Autogenerated return type of RemoveCallbackRequest
    """
    type RemoveCallbackRequestPayload implements MutationResult {
      callbackRequest: CallbackRequest

      """
      A unique identifier for the client performing the mutation.
      """
      clientMutationId: String
      errors: [UserError!]!
      notice: String
      success: Boolean!
    }

    """
    Autogenerated input type of RemoveJob
    """
    input RemoveJobInput {
      """
      A unique identifier for the client performing the mutation.
      """
      clientMutationId: String
      comment: String
      jobId: ID!
      meetingId: ID
      notifyClient: Boolean
      reasonId: ID
      refundDeposit: Boolean
      subReasonId: ID
    }

    """
    Autogenerated return type of RemoveJob
    """
    type RemoveJobPayload implements MutationResult {
      """
      A unique identifier for the client performing the mutation.
      """
      clientMutationId: String
      errors: [UserError!]!
      job: Job
      notice: String
      success: Boolean!
    }

    """
    Autogenerated input type of RemoveMeeting
    """
    input RemoveMeetingInput {
      """
      A unique identifier for the client performing the mutation.
      """
      clientMutationId: String
      meetingId: ID!
    }

    """
    Autogenerated return type of RemoveMeeting
    """
    type RemoveMeetingPayload implements MutationResult {
      """
      A unique identifier for the client performing the mutation.
      """
      clientMutationId: String
      errors: [UserError!]!
      meeting: Meeting
      notice: String
      success: Boolean!
      viewer: Viewer
    }

    """
    Autogenerated input type of RemoveNoteAttachment
    """
    input RemoveNoteAttachmentInput {
      """
      A unique identifier for the client performing the mutation.
      """
      clientMutationId: String
      noteId: ID!
    }

    """
    Autogenerated return type of RemoveNoteAttachment
    """
    type RemoveNoteAttachmentPayload implements MutationResult {
      """
      A unique identifier for the client performing the mutation.
      """
      clientMutationId: String
      errors: [UserError!]!
      note: Note
      notice: String
      success: Boolean!
    }

    """
    Autogenerated input type of RemoveNote
    """
    input RemoveNoteInput {
      """
      A unique identifier for the client performing the mutation.
      """
      clientMutationId: String
      noteId: ID!
    }

    """
    Autogenerated return type of RemoveNote
    """
    type RemoveNotePayload implements MutationResult {
      """
      A unique identifier for the client performing the mutation.
      """
      clientMutationId: String
      errors: [UserError!]!
      note: Note
      notice: String
      success: Boolean!
    }

    """
    Autogenerated input type of RemoveTaskRecurringPeriod
    """
    input RemoveTaskRecurringPeriodInput {
      """
      A unique identifier for the client performing the mutation.
      """
      clientMutationId: String
      taskId: ID!
    }

    """
    Autogenerated return type of RemoveTaskRecurringPeriod
    """
    type RemoveTaskRecurringPeriodPayload implements MutationResult {
      """
      A unique identifier for the client performing the mutation.
      """
      clientMutationId: String
      errors: [UserError!]!
      notice: String
      success: Boolean!
      task: Task
    }

    """
    Autogenerated input type of RemoveTaskTag
    """
    input RemoveTaskTagInput {
      """
      A unique identifier for the client performing the mutation.
      """
      clientMutationId: String
      tagId: ID!
      taskId: ID!
    }

    """
    Autogenerated return type of RemoveTaskTag
    """
    type RemoveTaskTagPayload implements MutationResult {
      """
      A unique identifier for the client performing the mutation.
      """
      clientMutationId: String
      errors: [UserError!]!
      notice: String
      success: Boolean!
      task: Task
    }

    """
    Autogenerated input type of RemoveTaskWatcher
    """
    input RemoveTaskWatcherInput {
      """
      A unique identifier for the client performing the mutation.
      """
      clientMutationId: String
      taskId: ID!
      watcherId: ID!
    }

    """
    Autogenerated return type of RemoveTaskWatcher
    """
    type RemoveTaskWatcherPayload implements MutationResult {
      """
      A unique identifier for the client performing the mutation.
      """
      clientMutationId: String
      errors: [UserError!]!
      notice: String
      success: Boolean!
      task: Task
    }

    """
    Autogenerated input type of ReopenOperationalIssue
    """
    input ReopenOperationalIssueInput {
      """
      A unique identifier for the client performing the mutation.
      """
      clientMutationId: String
      comment: String!
      operationalIssueId: ID!
    }

    """
    Autogenerated return type of ReopenOperationalIssue
    """
    type ReopenOperationalIssuePayload implements MutationResult {
      """
      A unique identifier for the client performing the mutation.
      """
      clientMutationId: String
      errors: [UserError!]!
      notice: String
      operationalIssue: OperationalIssue
      success: Boolean!
    }

    """
    Autogenerated input type of RepauseClient
    """
    input RepauseClientInput {
      clientId: ID!

      """
      A unique identifier for the client performing the mutation.
      """
      clientMutationId: String
      comment: String!
      description: String
      dueDate: Date!
      priority: TaskPriorityLevel
      tagIds: [ID!]
    }

    """
    Autogenerated return type of RepauseClient
    """
    type RepauseClientPayload implements MutationResult {
      client: Client

      """
      A unique identifier for the client performing the mutation.
      """
      clientMutationId: String
      errors: [UserError!]!
      notice: String
      success: Boolean!
    }

    """
    Autogenerated input type of RescheduleTask
    """
    input RescheduleTaskInput {
      """
      A unique identifier for the client performing the mutation.
      """
      clientMutationId: String
      dueDate: Date
      taskId: ID!
    }

    """
    Autogenerated return type of RescheduleTask
    """
    type RescheduleTaskPayload implements MutationResult {
      """
      A unique identifier for the client performing the mutation.
      """
      clientMutationId: String
      errors: [UserError!]!
      notice: String
      success: Boolean!
      task: Task
    }

    """
    Autogenerated input type of ResolveOperationalIssue
    """
    input ResolveOperationalIssueInput {
      causeIds: [ID!]

      """
      A unique identifier for the client performing the mutation.
      """
      clientMutationId: String
      observation: String!
      operationalIssueId: ID!
      otherCauseReason: String
      resolution: String!
    }

    """
    Autogenerated return type of ResolveOperationalIssue
    """
    type ResolveOperationalIssuePayload implements MutationResult {
      """
      A unique identifier for the client performing the mutation.
      """
      clientMutationId: String
      errors: [UserError!]!
      notice: String
      operationalIssue: OperationalIssue
      success: Boolean!
    }

    """
    Autogenerated input type of RestartTask
    """
    input RestartTaskInput {
      """
      A unique identifier for the client performing the mutation.
      """
      clientMutationId: String
      taskId: ID!
    }

    """
    Autogenerated return type of RestartTask
    """
    type RestartTaskPayload implements MutationResult {
      """
      A unique identifier for the client performing the mutation.
      """
      clientMutationId: String
      errors: [UserError!]!
      notice: String
      success: Boolean!
      task: Task
    }

    """
    Autogenerated input type of RestoreClientFromBadLead
    """
    input RestoreClientFromBadLeadInput {
      clientId: ID!

      """
      A unique identifier for the client performing the mutation.
      """
      clientMutationId: String
      comment: String!
    }

    """
    Autogenerated return type of RestoreClientFromBadLead
    """
    type RestoreClientFromBadLeadPayload implements MutationResult {
      client: Client

      """
      A unique identifier for the client performing the mutation.
      """
      clientMutationId: String
      errors: [UserError!]!
      notice: String
      success: Boolean!
    }

    """
    Autogenerated input type of RestoreClientFromBlackFlag
    """
    input RestoreClientFromBlackFlagInput {
      clientId: ID!

      """
      A unique identifier for the client performing the mutation.
      """
      clientMutationId: String
      comment: String!
    }

    """
    Autogenerated return type of RestoreClientFromBlackFlag
    """
    type RestoreClientFromBlackFlagPayload implements MutationResult {
      client: Client

      """
      A unique identifier for the client performing the mutation.
      """
      clientMutationId: String
      errors: [UserError!]!
      notice: String
      success: Boolean!
    }

    """
    Autogenerated input type of RestoreClient
    """
    input RestoreClientInput {
      clientId: ID!

      """
      A unique identifier for the client performing the mutation.
      """
      clientMutationId: String
      comment: String!
    }

    """
    Autogenerated return type of RestoreClient
    """
    type RestoreClientPayload implements MutationResult {
      client: Client

      """
      A unique identifier for the client performing the mutation.
      """
      clientMutationId: String
      errors: [UserError!]!
      notice: String
      success: Boolean!
    }

    """
    Autogenerated input type of ResumeClient
    """
    input ResumeClientInput {
      clientId: ID!

      """
      A unique identifier for the client performing the mutation.
      """
      clientMutationId: String
      comment: String!
    }

    """
    Autogenerated return type of ResumeClient
    """
    type ResumeClientPayload implements MutationResult {
      client: Client

      """
      A unique identifier for the client performing the mutation.
      """
      clientMutationId: String
      errors: [UserError!]!
      notice: String
      success: Boolean!
    }

    """
    Autogenerated input type of ResumePostponedJob
    """
    input ResumePostponedJobInput {
      """
      A unique identifier for the client performing the mutation.
      """
      clientMutationId: String
      jobId: ID!
    }

    """
    Autogenerated return type of ResumePostponedJob
    """
    type ResumePostponedJobPayload implements MutationResult {
      """
      A unique identifier for the client performing the mutation.
      """
      clientMutationId: String
      errors: [UserError!]!
      job: Job
      notice: String
      success: Boolean!
    }

    type ReviewAttempt implements Node @key(fields: "id") {
      commentary: String
      id: ID!
      kind: ReviewKind!
      performer: Staff!
      reviewLink: String
    }

    type ReviewAttemptConnection {
      nodes: [ReviewAttempt!]!
      totalCount: Int!
    }

    enum ReviewKind {
      AWAITING
      LEFT_VM
      NEGATIVE
      SUCCESS
    }

    enum ReviewStatus {
      AWAITING
      EXEMPTED
      FAILED
      NONE
      PENDING_CONTACT
      RESET
      SUCCESS
    }

    interface Role @key(fields: "id") {
      """
      Not optimized. N+1. Use when necessary. Try to avoid call within connection.
      """
      applicationInfo: ApplicationInfo
      availableForMeeting(
        """
        Start Time in ISO8601 format (e.g. 2005-08-09T18:31:42)
        """
        from: Time!

        """
        End Time in ISO8601 format (e.g. 2005-08-09T18:31:42)
        """
        till: Time!
      ): Boolean!
      citizenship: Country

      """
      decorated location's city with more descriptive address components
      """
      cityDescription: String
      communicationTrackingToken(abilities: [String!]!): String!
      contacts(filter: ContactFilter): ContactConnection!
      email: String!
      emailPreview(body: String, title: String): EmailPreview
      emailRecipientName: String
      fullName: String!
      id: ID!
      location: Location!
      ofacProhibited: Boolean!
      ofacStatus: OfacStatus!
      ofacStatusComment: String
      operations: RoleOperations!
      ownedOperationalIssues(
        filter: RoleOwnedOperationalIssueFilter
        pagination: OffsetPagination!
      ): OperationalIssueOffsetConnection!
      photo: Photo
      scheduledMeetings: ScheduledMeetingsConnection!
      skype: String
      timeZone: TimeZone

      """
      Platform domain-level category of the role. Semantically DIFFERENT from __typename
      """
      type: String!
      unresolvedOwnedOperationalIssuesCount: Int!
      userLegacyId: Int!
      viewerPendingCommunications: TaskSimpleConnection!
    }

    type RoleConnection {
      nodes: [Role!]!
    }

    type RoleContact implements Contact {
      category: String
      id: ID!
      note: String
      primary: Boolean!
      type: ContactType!
      value: String!
    }

    input RoleFilter {
      scope: RoleScope!
    }

    type RoleFlag implements Node @key(fields: "id") {
      comment: String
      createdAt: Time!
      flag: Flag!

      """
      null flaggedBy - flagged by system
      """
      flaggedBy: Role
      id: ID!
      updatedAt: Time!
    }

    type RoleFlagConnection {
      nodes: [RoleFlag!]!
    }

    interface RoleOperations {
      createMeeting: Operation!
    }

    union RoleOrClient =
        Client
      | CompanyRepresentative
      | Leader
      | ReferralPartner
      | Staff
      | Talent
      | TalentPartner

    type RoleOrClientNullableSimpleConnection {
      nodes: [RoleOrClient]!
    }

    type RoleOrClientOffsetConnection {
      nodes: [RoleOrClient!]!
      totalCount: Int!
    }

    type RoleOrClientSimpleConnection {
      nodes: [RoleOrClient!]!
    }

    input RoleOwnedOperationalIssueFilter {
      scope: RoleOwnedOperationalIssueScope!
    }

    enum RoleOwnedOperationalIssueScope {
      CLAIMED
      PENDING
      RESOLVED
    }

    """
    Possible role scopes.
    """
    enum RoleScope {
      COMPANY_CLAIMERS
      COMPANY_CLIENT_PARTNERS
      COMPANY_FINANCE_TEAM_MEMBERS
      COMPANY_SMB_PROJECT_RELATIONSHIP_MANAGERS
      COMPANY_SMB_PROJECT_SALES_SPECIALISTS
      JOB_CLAIMERS
      OPPORTUNITY_SMB_ACCOUNT_MANAGERS
      OPPORTUNITY_SMB_RELATIONSHIP_MANAGERS
      TALENT_MATCHERS
    }

    enum RoleStatus {
      ACTIVE
      APPLIED
      REJECTED
      REMOVED
    }

    type RoleStep implements Node @key(fields: "id") @key(fields: "id") {
      claimer: Role
      createdAt: Time!
      id: ID!
      status: String!
      step: Step!
      title: String!
    }

    type RoleStepConnection {
      nodes: [RoleStep!]!
      totalCount: Int!
    }

    input RoleStepFilter {
      statuses: [RoleStepStatus!]
      stepTypes: [String!]
    }

    enum RoleStepStatus {
      APPROVED
      CLAIMED
      DISCARDED
      INITIATED
    }

    """
    Autogenerated input type of ScheduleEngagementBreak
    """
    input ScheduleEngagementBreakInput {
      """
      A unique identifier for the client performing the mutation.
      """
      clientMutationId: String
      comment: String!
      endDate: Date
      engagementId: ID!

      """
      FeedbackReason id with ENGAGEMENT_PAUSED action
      """
      reasonId: ID!

      """
      If false then endDate is required
      """
      singleDay: Boolean!
      startDate: Date!
    }

    """
    Autogenerated return type of ScheduleEngagementBreak
    """
    type ScheduleEngagementBreakPayload implements MutationResult {
      """
      A unique identifier for the client performing the mutation.
      """
      clientMutationId: String
      engagement: Engagement
      engagementBreak: EngagementBreak
      errors: [UserError!]!
      notice: String
      success: Boolean!
    }

    type ScheduledMeetingsConnection {
      nodes: [Meeting!]!
    }

    type ScholarshipApplication implements Node & WebResource
      @key(fields: "id") {
      id: ID!
      title: String
      webResource: Link!
    }

    """
    An object ID or NONE/ME string value
    """
    scalar SearchableNoneMeId

    """
    Autogenerated input type of SendEmailTo
    """
    input SendEmailToInput {
      body: String!
      cc: [String!]

      """
      A unique identifier for the client performing the mutation.
      """
      clientMutationId: String
      emailTemplateId: Int
      title: String!

      """
      To global id, you can use Client.id or Role.id
      """
      toId: ID!
    }

    """
    Autogenerated return type of SendEmailTo
    """
    type SendEmailToPayload implements MutationResult {
      """
      A unique identifier for the client performing the mutation.
      """
      clientMutationId: String
      errors: [UserError!]!
      notice: String
      success: Boolean!
    }

    type Skill implements Node @key(fields: "id") {
      category: SkillCategory!
      competentProfilesCount: Int!
      expertProfilesCount: Int!
      id: ID!
      name: String!
      strongProfilesCount: Int!
      totalProfilesCount: Int!
    }

    type SkillCategory implements Node @key(fields: "id") {
      id: ID!
      title: String!
    }

    type SkillEdge {
      main: Boolean!
      node: Skill!
      rating: SkillRating!
    }

    input SkillInput {
      categoryId: ID!
      name: String!
    }

    type SkillPage {
      title: String!
    }

    enum SkillRating {
      COMPETENT
      EXPERT
      STRONG
    }

    input SkillSetInput {
      destroy: Boolean
      id: ID
      main: Boolean!
      rating: Int!
      skill: SkillInput!
    }

    input SkillsAutocompleteFilter {
      excludedIds: [ID!]
      term: String
    }

    """
    A type for sorting plural fields
    """
    input SortBy {
      order: SortOrderEnum!

      """
      Field to sort by
      """
      target: String!
    }

    """
    Represents sorting order direction, can be either ascending or descending.
    """
    enum SortOrderEnum {
      ASC
      DESC
    }

    type Specialization implements Node @key(fields: "id") {
      id: ID!
      title: String!
    }

    type SpecializationConnection {
      nodes: [Specialization!]!
    }

    type Staff implements EmailCarbonCopyOptions & EmailTemplates & Node & RelatedTasksHolder & Role & Timezoned & WebResource
      @key(fields: "id") {
      """
      Not optimized. N+1. Use when necessary. Try to avoid call within connection.
      """
      applicationInfo: ApplicationInfo
      availableForMeeting(
        """
        Start Time in ISO8601 format (e.g. 2005-08-09T18:31:42)
        """
        from: Time!

        """
        End Time in ISO8601 format (e.g. 2005-08-09T18:31:42)
        """
        till: Time!
      ): Boolean!
      blankEmailTemplate: EmailTemplate
      citizenship: Country

      """
      decorated location's city with more descriptive address components
      """
      cityDescription: String
      communicationTrackingToken(abilities: [String!]!): String!
      contacts(filter: ContactFilter): ContactConnection!
      email: String!
      emailCarbonCopyOptions: EmailCarbonCopyOptionConnection
      emailPreview(body: String, title: String): EmailPreview
      emailRecipientName: String
      emailTemplates: EmailTemplateConnection!
      fullName: String!
      id: ID!
      inTalentMatchers: Boolean!
      location: Location!
      ofacProhibited: Boolean!
      ofacStatus: OfacStatus!
      ofacStatusComment: String
      operations: StaffOperations!
      ownedOperationalIssues(
        filter: RoleOwnedOperationalIssueFilter
        pagination: OffsetPagination!
      ): OperationalIssueOffsetConnection!
      photo: Photo
      relatedTasks(
        filter: RelatedTasksFilter!
        pagination: OffsetPagination!
      ): RelatedTasksConnection
      scheduledMeetings: ScheduledMeetingsConnection!
      skype: String
      teams(filter: TeamsFilter): TeamConnection!
      timeZone: TimeZone

      """
      Platform domain-level category of the role. Semantically DIFFERENT from __typename
      """
      type: String!
      unresolvedOwnedOperationalIssuesCount: Int!
      userLegacyId: Int!
      viewerPendingCommunications: TaskSimpleConnection!
      webResource: Link!
    }

    type StaffConnection {
      nodes: [Staff!]!
    }

    type StaffOperations implements RoleOperations {
      createMeeting: Operation!
      updateProfileStaff: Operation!
    }

    """
    Autogenerated input type of StarTask
    """
    input StarTaskInput {
      """
      A unique identifier for the client performing the mutation.
      """
      clientMutationId: String
      starred: Boolean!
      taskId: ID!
    }

    """
    Autogenerated return type of StarTask
    """
    type StarTaskPayload implements MutationResult {
      """
      A unique identifier for the client performing the mutation.
      """
      clientMutationId: String
      errors: [UserError!]!
      notice: String
      success: Boolean!
      task: Task
    }

    type StatusMessage {
      data: [StatusMessageDataEntry!]!
      expireDuration: Int
      severity: StatusMessageSeverity!
      sticky: Boolean!
      store: Boolean!
      storeKey: String
      tag: StatusMessageTag!
      text: String!
    }

    type StatusMessageConnection {
      nodes: [StatusMessage!]!
    }

    type StatusMessageDataEntry {
      key: String!
      value: String!
    }

    enum StatusMessageSeverity {
      ALERT
      ERROR
      INFO
      NOTICE
      WARNING
    }

    enum StatusMessageTag {
      ACTIONABLE_ISSUE
      CLOSE_ESCALATION
      DAYOFF
      GOOGLE_CALENDAR_FAILED
      HANDOFF_FINISHED
      TOS_TEXT
      UNFILLED_CALLS_NOTICE
      WRONG_TIME_ZONE
    }

    type Step {
      stepType: String
      title: String!
    }

    union Subject =
        Client
      | CommunityEvent
      | CompanyRepresentative
      | Engagement
      | ExternalTaskSubject
      | Job
      | Leader
      | Meeting
      | MentorApplication
      | Opportunity
      | PurchaseOrder
      | ReferralPartner
      | ScholarshipApplication
      | Staff
      | Talent
      | TalentPartner

    type SubjectConnection {
      nodes: [Subject!]!
    }

    type Talent implements EmailCarbonCopyOptions & EmailTemplates & Node & Notable & RelatedTasksHolder & Role & Timezoned & WebResource
      @key(fields: "id")
      @key(fields: "_talentOrEngagementId") {
      _talentOrEngagementId: ID!
      allocatedHoursConfirmedAt: Time

      """
      Not optimized. N+1. Use when necessary. Try to avoid call within connection.
      """
      applicationInfo: ApplicationInfo
      applications(filter: JobApplicationFilter): JobApplicationConnection!
      availableForMeeting(
        """
        Start Time in ISO8601 format (e.g. 2005-08-09T18:31:42)
        """
        from: Time!

        """
        End Time in ISO8601 format (e.g. 2005-08-09T18:31:42)
        """
        till: Time!
      ): Boolean!
      availableHours: Int!
      blankEmailTemplate: EmailTemplate
      breaks(filter: EngagementBreakFilter): EngagementBreakConnection!
      citizenship: Country

      """
      decorated location's city with more descriptive address components
      """
      cityDescription: String
      communicationTrackingToken(abilities: [String!]!): String!
      contacts(filter: ContactFilter): ContactConnection!
      cumulativeStatus: TalentCumulativeStatus!
      email: String!
      emailCarbonCopyOptions: EmailCarbonCopyOptionConnection
      emailPreview(body: String, title: String): EmailPreview
      emailRecipientName: String
      emailTemplates: EmailTemplateConnection!
      engagements: TalentEngagementConnection!
      fullName: String!
      hourlyRate: BigDecimal
      id: ID!
      inactivityRejectionDeadlines(
        pagination: OffsetPagination
        sort: InactivityRejectionDeadlinesOrderFieldSortBy
      ): InactivityRejectionDeadlineConnection!
      investigations(filter: InvestigationsFilter): InvestigationConnection!
      joinedAt: Time!
      legalName: String
      linkedinUrl: String
      location: Location!
      newSourcer: Role
      newcomer: Boolean!
      notes: NoteConnection
      ofacProhibited: Boolean!
      ofacStatus: OfacStatus!
      ofacStatusComment: String
      operations: TalentOperations!
      ownedOperationalIssues(
        filter: RoleOwnedOperationalIssueFilter
        pagination: OffsetPagination!
      ): OperationalIssueOffsetConnection!
      photo: Photo
      primarySkill: SkillPage
      profile: TalentProfile
      reapplicationDate: Date
      relatedTasks(
        filter: RelatedTasksFilter!
        pagination: OffsetPagination!
      ): RelatedTasksConnection
      resumeUrl: String!
      roleSteps(
        filter: RoleStepFilter
        pagination: OffsetPagination!
        sort: SortBy
      ): RoleStepConnection!
      scheduledMeetings: ScheduledMeetingsConnection!
      skype: String
      specializationApplications(
        filter: TalentSpecializationApplicationFilter
      ): TalentSpecializationApplicationConnection!
      status: String!
      talentPartner: TalentPartner
      talentType: String!
      timeZone: TimeZone

      """
      Platform domain-level category of the role. Semantically DIFFERENT from __typename
      """
      type: String!
      unresolvedOwnedOperationalIssuesCount: Int!
      userLegacyId: Int!
      viewerPendingCommunications: TaskSimpleConnection!
      webResource: Link!
    }

    type TalentConnection {
      nodes: [Talent!]!
    }

    enum TalentCumulativeStatus {
      ACTIVE
      APPLIED
      IN_ONBOARDING
      PAUSED
      PENDING_PROFILE
      REJECTED
      REJECTED_INACTIVE
      REMOVED
    }

    type TalentEngagementConnection @key(fields: "_talentId") {
      _talentId: ID!
      counters: TalentEngagementsCounters!
      jobCounters: TalentEngagementsJobCounters!
      nodes: [Engagement!]!
    }

    type TalentEngagementsCounters {
      acceptedInterviewsNumber: Int!
      approvedTrialsNumber: Int!
      interviewsNumber: Int!
      successRate: Float!
      trialsNumber: Int!
      workingNumber: Int!
    }

    type TalentEngagementsJobCounters {
      active: Int!
      closed: Int!
      removed: Int!
      total: Int!
    }

    input TalentMatcherInput {
      """
      Possible values: none, me, role.id
      """
      roleIdentifier: String!
      talentType: String!
    }

    type TalentOperations implements RoleOperations {
      createMeeting: Operation!
    }

    type TalentPartner implements EmailCarbonCopyOptions & EmailTemplates & Node & Notable & RelatedTasksHolder & Role & Timezoned & WebResource
      @key(fields: "id") {
      """
      Not optimized. N+1. Use when necessary. Try to avoid call within connection.
      """
      applicationInfo: ApplicationInfo
      availableForMeeting(
        """
        Start Time in ISO8601 format (e.g. 2005-08-09T18:31:42)
        """
        from: Time!

        """
        End Time in ISO8601 format (e.g. 2005-08-09T18:31:42)
        """
        till: Time!
      ): Boolean!
      blankEmailTemplate: EmailTemplate
      citizenship: Country

      """
      decorated location's city with more descriptive address components
      """
      cityDescription: String
      communicationTrackingToken(abilities: [String!]!): String!
      contacts(filter: ContactFilter): ContactConnection!
      email: String!
      emailCarbonCopyOptions: EmailCarbonCopyOptionConnection
      emailPreview(body: String, title: String): EmailPreview
      emailRecipientName: String
      emailTemplates: EmailTemplateConnection!
      fullName: String!
      id: ID!
      location: Location!
      notes: NoteConnection
      ofacProhibited: Boolean!
      ofacStatus: OfacStatus!
      ofacStatusComment: String
      operations: TalentPartnerOperations!
      ownedOperationalIssues(
        filter: RoleOwnedOperationalIssueFilter
        pagination: OffsetPagination!
      ): OperationalIssueOffsetConnection!
      photo: Photo
      relatedTasks(
        filter: RelatedTasksFilter!
        pagination: OffsetPagination!
      ): RelatedTasksConnection
      scheduledMeetings: ScheduledMeetingsConnection!
      skype: String
      timeZone: TimeZone

      """
      Platform domain-level category of the role. Semantically DIFFERENT from __typename
      """
      type: String!
      unresolvedOwnedOperationalIssuesCount: Int!
      userLegacyId: Int!
      viewerPendingCommunications: TaskSimpleConnection!
      webResource: Link!
    }

    type TalentPartnerOperations implements RoleOperations {
      createMeeting: Operation!
    }

    type TalentProfile {
      github: Link
      resumeFiles(
        pagination: OffsetPagination
      ): TalentProfileResumeFileConnection!
    }

    type TalentProfileResumeFile {
      identifier: String!
      uploadedAt: Time
      url: String!
    }

    type TalentProfileResumeFileConnection {
      nodes: [TalentProfileResumeFile!]!
      totalCount: Int!
    }

    type TalentSpecializationApplication {
      createdAt: Time
      specialization: Specialization
      status: TalentSpecializationApplicationStatus!
    }

    type TalentSpecializationApplicationConnection {
      nodes: [TalentSpecializationApplication!]!
    }

    input TalentSpecializationApplicationFilter {
      statuses: [TalentSpecializationApplicationStatus!]
    }

    enum TalentSpecializationApplicationStatus {
      APPROVED
      CANCELLED
      PENDING
      REJECTED
      REJECTED_INACTIVE
    }

    type Task implements Node @key(fields: "id") {
      activateAt: Time
      activatedAt: Time
      activity: Activity
      client: Client
      completer: RoleOrClient
      description: String!
      disputeReason: String
      disputed: Boolean!
      disputedAt: Time
      dueDate: Date
      engagedSubjects: RoleOrClientSimpleConnection!
      finishedWithChildTask: Boolean!
      id: ID!
      metadata: JSON!
      operations: TaskOperations!
      performer: RoleOrClient!
      playbookTemplate: PlaybookTemplate
      priority: TaskPriorityLevel!
      recurringPeriod: Int
      relatedTime: Time
      relatedTo: TaskRelatedTo
      relatedToV2: Subject
      starred: Boolean!
      status: String!
      subjects: SubjectConnection!
      tags: TaskTagConnection!
      talent: Talent
      watchers: RoleOrClientSimpleConnection!
    }

    input TaskBadgesFilter {
      ids: [ID!]
      keywords: [String!]
      logic: LogicOperator
      names: [String!]
      tags: [String!]
    }

    type TaskConnection {
      counters: TaskConnectionCounters!
      edges: [TaskConnectionEdge!]!
      nodes: [Task!]!
      totalCount: Int!
    }

    type TaskConnectionCounters {
      pending: Int!
      playbook: Int!
      thisWeek: Int!
      today: Int!
      total: Int!
    }

    type TaskConnectionEdge {
      group: TaskGroup!
      node: Task!
    }

    input TaskFilter {
      badges: TaskBadgesFilter
      completedAt: TimeRange
      dueDate: DateRange
      performerIds: [ID!]
      playbooks: [String!]
      priorities: [TaskPriorityLevel!]
      starred: Boolean
      statuses: [TaskFilterStatus!]
      timezones: Range
      watcherId: ID
    }

    enum TaskFilterStatus {
      COMPLETED
      COMPLETED_TODAY
      DISPUTED
      DISPUTE_ACCEPTED
      PENDING
    }

    type TaskGroup {
      id: ID!
      name: String!
    }

    type TaskOperations {
      acceptTaskDispute: Operation!
      addTaskComment: Operation!
      addTaskTag: Operation!
      addTaskWatcher: Operation!
      cancelTask: Operation!
      cancelTaskDispute: Operation!
      changeTaskPriority: Operation!
      changeTaskRecurringPeriod: Operation!
      createActivity: Operation!
      disputeTask: Operation!
      finishTask: Operation!
      reassignTask: Operation!
      removeTaskTag: Operation!
      removeTaskWatcher: Operation!
      rescheduleTask: Operation!
      restartTask: Operation!
      starTask: Operation!
      updateTaskDescription: Operation!
    }

    """
    Possible task priorities
    """
    enum TaskPriorityLevel {
      HIGH
      LOW
      MEDIUM
    }

    type TaskRelatedTo implements WebResource {
      id: ID!
      title: String!
      type: String!
      webResource: Link!
    }

    type TaskSimpleConnection {
      nodes: [Task!]!
    }

    """
    Possible task sources
    """
    enum TaskSource {
      AM_TASKS_SUGGESTION_GUIDELINE
      DASHBOARD_DUE_TASKS
      DATA_MIGRATION
      FEATURES
      RELATED_TASKS_COMPANY_PROFILE
      RELATED_TASKS_ENTERPRISE_PROFILE
      RELATED_TASKS_INVOICE
      RELATED_TASKS_JOB
      RELATED_TASKS_OPPORTUNITY
      RELATED_TASKS_PAYMENT
      RELATED_TASKS_PURCHASE_ORDER
      RELATED_TASKS_SCHOLARSHIP_APPLICATION
      RELATED_TASKS_TALENT
      TASKS_COMPANIES_LIST_EMPTY
      TASKS_COMPANIES_LIST_HEADER
      TASKS_LIST
      TASKS_TALENTS_LIST_EMPTY
      TASKS_TALENTS_LIST_HEADER
    }

    type TaskTag implements Node @key(fields: "id") {
      id: ID!
      name: String!
      operations: TaskTagOperations!
      ownership: TaskTagOwnership!
    }

    type TaskTagConnection {
      nodes: [TaskTag!]!
    }

    input TaskTagFilter {
      ownership: TaskTagOwnership
    }

    type TaskTagOperations {
      destroyTaskTag: Operation!
      updateTaskTag: Operation!
    }

    enum TaskTagOwnership {
      GLOBAL
      PERSONAL
    }

    type TasksCounters {
      overdue: Int!
      pending: Int!
      today: Int!
    }

    type Team implements Node @key(fields: "id") {
      emailTracking: Boolean!
      id: ID!
      identifier: String
      name: String!
      playbookTasks(pagination: OffsetPagination): PlaybookTaskConnection!
      roles: RoleOrClientOffsetConnection!
    }

    type TeamConnection {
      nodes: [Team!]!
      totalCount: Int!
    }

    input TeamsFilter {
      emailTracking: Boolean
    }

    type Testimonial {
      id: ID!
    }

    input TestimonialFilter {
      statuses: [TestimonialStatus!]
    }

    enum TestimonialStatus {
      DRAFT
      PUBLISHED
      REMOVED
    }

    """
    Time in a given timezone expressed as iso8601
    """
    scalar Time

    """
    Time filter
    """
    input TimeRange {
      """
      Start Time in ISO8601 format (e.g. 2005-08-09T18:31:42)
      """
      from: Time

      """
      End Time in ISO8601 format (e.g. 2005-08-09T18:31:42)
      """
      till: Time
    }

    """
    A timezone
    """
    type TimeZone {
      """
      Determine whether the given TimeZone is the same as stated (ie.
      [Europe/Warsaw] == [CET]). Returns false when given invalid ianaCode
      """
      isSameAs(ianaCode: String!): Boolean!

      location: String!

      name: String!

      """
      The offset from standard time for the zone in seconds (i.e. non-zero if daylight savings is being observed).
      """
      stdOffset: Int!

      """
      The base offset of the timezone from UTC in seconds.
      """
      utcOffset: Int!

      value: String!
    }

    # type Timesheet implements Node @extends @key(fields: "id") {
    #   id: ID! @external
    # }

    input TimesheetFilter {
      accessLevel: AccessLevelFilter!
      type: String!
    }

    input TimezoneRangeFilter {
      from: String!
      to: String!
    }

    interface Timezoned {
      timeZone: TimeZone
    }

    type Tokens {
      charts: String!
      chronicles: String!
      globalCommunicationTracking(abilities: [String!]!): String!
      lens: String!
    }

    """
    Autogenerated input type of TouchCounter
    """
    input TouchCounterInput {
      """
      A unique identifier for the client performing the mutation.
      """
      clientMutationId: String
      counterName: String!
    }

    """
    Autogenerated return type of TouchCounter
    """
    type TouchCounterPayload implements MutationResult {
      """
      A unique identifier for the client performing the mutation.
      """
      clientMutationId: String
      counter: Counter
      errors: [UserError!]!
      notice: String
      success: Boolean!
    }

    """
    Autogenerated input type of TransferMeeting
    """
    input TransferMeetingInput {
      """
      A unique identifier for the client performing the mutation.
      """
      clientMutationId: String
      meetingId: ID!
      schedulerId: String!
    }

    """
    Autogenerated return type of TransferMeeting
    """
    type TransferMeetingPayload implements MutationResult {
      """
      A unique identifier for the client performing the mutation.
      """
      clientMutationId: String
      errors: [UserError!]!
      meeting: Meeting
      notice: String
      success: Boolean!
    }

    """
    Autogenerated input type of UpdateActivity
    """
    input UpdateActivityInput {
      activityContactRoleIds: [ID!]
      activityId: ID!

      """
      A unique identifier for the client performing the mutation.
      """
      clientMutationId: String
      details: String
      occurredAt: Time!

      """
      Depending on the type it is supposed to be one of *ActivityOutcome enum values
      """
      outcome: String!

      """
      Depending on the type it is supposed to be one of *ActivitySubtype enum values
      """
      subtype: String!
      title: String!
      type: ActivityType!
    }

    """
    Autogenerated return type of UpdateActivity
    """
    type UpdateActivityPayload implements MutationResult {
      activity: Activity

      """
      A unique identifier for the client performing the mutation.
      """
      clientMutationId: String
      errors: [UserError!]!
      notice: String
      success: Boolean!
    }

    """
    Autogenerated input type of UpdateNote
    """
    input UpdateNoteInput {
      attachment: Upload

      """
      A unique identifier for the client performing the mutation.
      """
      clientMutationId: String
      comment: String
      noteId: ID!
      title: String
    }

    """
    Autogenerated return type of UpdateNote
    """
    type UpdateNotePayload implements MutationResult {
      """
      A unique identifier for the client performing the mutation.
      """
      clientMutationId: String
      errors: [UserError!]!
      note: Note
      notice: String
      success: Boolean!
    }

    """
    Autogenerated input type of UpdateProfileClient
    """
    input UpdateProfileClientInput {
      about: String
      accountPlan: String
      businessType: BusinessTypes
      clientId: ID!

      """
      A unique identifier for the client performing the mutation.
      """
      clientMutationId: String
      crunchbase: String
      fullName: String!
      howDidYouHear: HowDidYouHearValues
      howDidYouHearDetails: String
      industry: Industries

      """
      Values should be fetched from verticals(filter: {withPseudo: true}) {node{id}}
      """
      interestedInId: ID
      jobContactsEnabled: Boolean
      location: LocationInput
      reviewLink: String
      twitter: String
      website: String
    }

    """
    Autogenerated return type of UpdateProfileClient
    """
    type UpdateProfileClientPayload implements MutationResult {
      client: Client

      """
      A unique identifier for the client performing the mutation.
      """
      clientMutationId: String
      errors: [UserError!]!
      notice: String
      success: Boolean!
    }

    """
    Autogenerated input type of UpdateProfileStaff
    """
    input UpdateProfileStaffInput {
      about: String
      callForwardingConfiguration: CallForwardingConfigurationInput!
      citizenshipId: ID

      """
      A unique identifier for the client performing the mutation.
      """
      clientMutationId: String
      displayZoneName: String
      email: String
      fullName: String!
      includePhoneInEmailSignatures: Boolean
      languageIds: [ID!]
      legalName: String
      location: LocationInput
      password: String
      passwordConfirmation: String
      phoneNumber: String
      skype: String
      slackHandle: String
      staffId: ID!
      timeZoneName: String!
      twilioNumber: String
      twitter: String
      website: String
    }

    """
    Autogenerated return type of UpdateProfileStaff
    """
    type UpdateProfileStaffPayload implements MutationResult {
      """
      A unique identifier for the client performing the mutation.
      """
      clientMutationId: String
      errors: [UserError!]!
      notice: String
      staff: Staff
      success: Boolean!
    }

    """
    Autogenerated input type of UpdateTaskDescription
    """
    input UpdateTaskDescriptionInput {
      """
      A unique identifier for the client performing the mutation.
      """
      clientMutationId: String
      description: String!
      taskId: ID!
    }

    """
    Autogenerated return type of UpdateTaskDescription
    """
    type UpdateTaskDescriptionPayload implements MutationResult {
      """
      A unique identifier for the client performing the mutation.
      """
      clientMutationId: String
      errors: [UserError!]!
      notice: String
      success: Boolean!
      task: Task
    }

    """
    Autogenerated input type of UpdateTaskTag
    """
    input UpdateTaskTagInput {
      """
      A unique identifier for the client performing the mutation.
      """
      clientMutationId: String
      name: String!
      taskTagId: ID!
    }

    """
    Autogenerated return type of UpdateTaskTag
    """
    type UpdateTaskTagPayload implements MutationResult {
      """
      A unique identifier for the client performing the mutation.
      """
      clientMutationId: String
      errors: [UserError!]!
      notice: String
      success: Boolean!
      taskTag: TaskTag
    }

    """
    Autogenerated input type of UpdateViewerTimeZone
    """
    input UpdateViewerTimeZoneInput {
      """
      A unique identifier for the client performing the mutation.
      """
      clientMutationId: String
      timeZoneName: String!
    }

    """
    Autogenerated return type of UpdateViewerTimeZone
    """
    type UpdateViewerTimeZonePayload implements MutationResult {
      """
      A unique identifier for the client performing the mutation.
      """
      clientMutationId: String
      errors: [UserError!]!
      notice: String
      success: Boolean!
      viewer: Viewer
    }

    scalar Upload

    interface UserError {
      code: String!
      key: String!
      message: String!
    }

    """
    Autogenerated input type of VerifyOperationalIssue
    """
    input VerifyOperationalIssueInput {
      """
      A unique identifier for the client performing the mutation.
      """
      clientMutationId: String
      operationalIssueId: ID!
    }

    """
    Autogenerated return type of VerifyOperationalIssue
    """
    type VerifyOperationalIssuePayload implements MutationResult {
      """
      A unique identifier for the client performing the mutation.
      """
      clientMutationId: String
      errors: [UserError!]!
      notice: String
      operationalIssue: OperationalIssue
      success: Boolean!
    }

    type Vertical implements Node @key(fields: "id") {
      id: ID!
      talentType: String!
    }

    type VerticalConnection {
      nodes: [Vertical!]!
    }

    input VerticalsFilter {
      withPseudo: Boolean
    }

    type Viewer {
      availableTools: ViewerAvailableTools!
      betaEnabled: Boolean!
      chameleonParticipantUuid: String!
      counters: CounterConnection!
      emailTemplates(
        filter: ViewerEmailTemplateFilter!
      ): EmailTemplateConnection!
      expiredCallTimers(useFakeData: Boolean): ExpiredCallTimerConnection!
      me: Staff!
      meetings(
        filter: MeetingFilter!

        """
        Offset parameter for connection node.
        """
        pagination: OffsetPagination!
      ): MeetingConnection
      operations: ViewerOperations!
      permits: Permits!
      playbookTasksCounters: TasksCounters!
      playbookTeams: TeamConnection!
      serverTimeZone: TimeZone!
      settings: ViewerSettings!
      statusMessages(
        jobId: ID

        """
        Intl.DateTimeFormat().resolvedOptions().timeZone
        """
        timeZoneName: String

        """
        -(new Date().getTimezoneOffset() * 60)
        """
        timeZoneOffset: Int
        useFakeData: Boolean
      ): StatusMessageConnection!
      tokens: Tokens!
    }

    type ViewerAvailableTools {
      salesTool: Boolean!
      salesToolEscalations: Boolean!
    }

    enum ViewerDataPolicy {
      GDPR
      PRIVACY_SHIELD
    }

    input ViewerEmailTemplateFilter {
      targetRole: String!
    }

    type ViewerOperations {
      updateViewerTimeZone: Operation!
    }

    type ViewerSettings {
      betaEnabled: Boolean!
      chameleonParticipantUuid: String!
      relevantDataPolicy: ViewerDataPolicy!
    }

    interface WebResource {
      webResource: Link!
    }

    """
    Represents week days.
    """
    enum WeekDay {
      FRIDAY
      MONDAY
      SATURDAY
      SUNDAY
      THURSDAY
      TUESDAY
      WEDNESDAY
    }
  `,
  resolvers: {
    Talent: {
      __resolveReference(object: { id: String }) {
        return { id: 'Talent/1', fullName: 'Foobar' };
      },
      id(object: Talent) {
        return talent.id;
      },

      fullName(object: Talent) {
        return object.fullName;
      },
    },
  },
};

it('handles value type interfaces that defined not in all services', async () => {
  const query = `#graphql
    query {
      node(id: "Talent/1") {
        ... on Role {
          id
          fullName
        }
      }
    }
  `;
  const variables = { id: 'Talent/1' };
  const { queryPlan, errors, data } = await execute({ query, variables }, [
    nodeService,
    staffService,
  ]);

  expect(queryPlan).toMatchInlineSnapshot(`
    QueryPlan {
      Sequence {
        Fetch(service: "nodeService") {
          {
            node(id: "Talent/1") {
              __typename
              ... on Role {
                id
                __typename
              }
              ... on CompanyRepresentative {
                id
              }
              ... on Staff {
                id
              }
              ... on Talent {
                id
              }
              ... on TalentPartner {
                id
              }
              ... on Leader {
                id
              }
              ... on ReferralPartner {
                id
              }
            }
          }
        },
        Flatten(path: "node") {
          Fetch(service: "staffSchema") {
            {
              ... on Role {
                __typename
              }
              ... on CompanyRepresentative {
                id
              }
              ... on Staff {
                id
              }
              ... on Talent {
                id
              }
              ... on TalentPartner {
                id
              }
              ... on Leader {
                id
              }
              ... on ReferralPartner {
                id
              }
            } =>
            {
              ... on Role {
                fullName
              }
            }
          },
        },
      },
    }
  `);
  expect(errors).toBeUndefined();
  expect(data).toEqual({
    nodes: [
      {
        id: 'Video/1',
      },
      {
        id: 'Audio/1',
        url: 'https://foobar.com/audios/1',
      },
    ],
  });
});
