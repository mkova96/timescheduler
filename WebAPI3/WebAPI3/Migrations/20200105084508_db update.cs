using System;
using Microsoft.EntityFrameworkCore.Migrations;

namespace WebAPI3.Migrations
{
    public partial class dbupdate : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "TimeFrom",
                table: "ActivityTask");

            migrationBuilder.AddColumn<string>(
                name: "DonePercentage",
                table: "ActivityTask",
                nullable: true);

            migrationBuilder.AddColumn<int>(
                name: "Duration",
                table: "ActivityTask",
                nullable: false,
                defaultValue: 0);

            migrationBuilder.AddColumn<int>(
                name: "ActivityColorId",
                table: "Activity",
                nullable: true);

            migrationBuilder.AddColumn<int>(
                name: "ActivityTypeId",
                table: "Activity",
                nullable: true);

            migrationBuilder.CreateTable(
                name: "ActivityType",
                columns: table => new
                {
                    ActivityTypeId = table.Column<int>(nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    ActivityTypeName = table.Column<string>(nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_ActivityType", x => x.ActivityTypeId);
                });

            migrationBuilder.CreateTable(
                name: "Schedule",
                columns: table => new
                {
                    ScheduleId = table.Column<int>(nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    Date = table.Column<DateTime>(nullable: false),
                    TimeFrom = table.Column<int>(nullable: false),
                    TimeTo = table.Column<int>(nullable: false),
                    Moveable = table.Column<bool>(nullable: false),
                    ActivityTaskId = table.Column<int>(nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Schedule", x => x.ScheduleId);
                    table.ForeignKey(
                        name: "FK_Schedule_ActivityTask_ActivityTaskId",
                        column: x => x.ActivityTaskId,
                        principalTable: "ActivityTask",
                        principalColumn: "ActivityTaskId",
                        onDelete: ReferentialAction.Restrict);
                });

            migrationBuilder.CreateTable(
                name: "userActivityType",
                columns: table => new
                {
                    UserActivityTypeId = table.Column<int>(nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    UserId = table.Column<int>(nullable: true),
                    ActivityTypeId = table.Column<int>(nullable: true),
                    TimeFrom = table.Column<int>(nullable: false),
                    TimeTo = table.Column<int>(nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_userActivityType", x => x.UserActivityTypeId);
                    table.ForeignKey(
                        name: "FK_userActivityType_ActivityType_ActivityTypeId",
                        column: x => x.ActivityTypeId,
                        principalTable: "ActivityType",
                        principalColumn: "ActivityTypeId",
                        onDelete: ReferentialAction.Restrict);
                    table.ForeignKey(
                        name: "FK_userActivityType_User_UserId",
                        column: x => x.UserId,
                        principalTable: "User",
                        principalColumn: "UserId",
                        onDelete: ReferentialAction.Restrict);
                });

            migrationBuilder.CreateIndex(
                name: "IX_Activity_ActivityColorId",
                table: "Activity",
                column: "ActivityColorId");

            migrationBuilder.CreateIndex(
                name: "IX_Activity_ActivityTypeId",
                table: "Activity",
                column: "ActivityTypeId");

            migrationBuilder.CreateIndex(
                name: "IX_Schedule_ActivityTaskId",
                table: "Schedule",
                column: "ActivityTaskId");

            migrationBuilder.CreateIndex(
                name: "IX_userActivityType_ActivityTypeId",
                table: "userActivityType",
                column: "ActivityTypeId");

            migrationBuilder.CreateIndex(
                name: "IX_userActivityType_UserId",
                table: "userActivityType",
                column: "UserId");

            migrationBuilder.AddForeignKey(
                name: "FK_Activity_ActivityColor_ActivityColorId",
                table: "Activity",
                column: "ActivityColorId",
                principalTable: "ActivityColor",
                principalColumn: "ActivityColorId",
                onDelete: ReferentialAction.Restrict);

            migrationBuilder.AddForeignKey(
                name: "FK_Activity_ActivityType_ActivityTypeId",
                table: "Activity",
                column: "ActivityTypeId",
                principalTable: "ActivityType",
                principalColumn: "ActivityTypeId",
                onDelete: ReferentialAction.Restrict);
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_Activity_ActivityColor_ActivityColorId",
                table: "Activity");

            migrationBuilder.DropForeignKey(
                name: "FK_Activity_ActivityType_ActivityTypeId",
                table: "Activity");

            migrationBuilder.DropTable(
                name: "Schedule");

            migrationBuilder.DropTable(
                name: "userActivityType");

            migrationBuilder.DropTable(
                name: "ActivityType");

            migrationBuilder.DropIndex(
                name: "IX_Activity_ActivityColorId",
                table: "Activity");

            migrationBuilder.DropIndex(
                name: "IX_Activity_ActivityTypeId",
                table: "Activity");

            migrationBuilder.DropColumn(
                name: "DonePercentage",
                table: "ActivityTask");

            migrationBuilder.DropColumn(
                name: "Duration",
                table: "ActivityTask");

            migrationBuilder.DropColumn(
                name: "ActivityColorId",
                table: "Activity");

            migrationBuilder.DropColumn(
                name: "ActivityTypeId",
                table: "Activity");

            migrationBuilder.AddColumn<DateTime>(
                name: "TimeFrom",
                table: "ActivityTask",
                type: "datetime2",
                nullable: false,
                defaultValue: new DateTime(1, 1, 1, 0, 0, 0, 0, DateTimeKind.Unspecified));
        }
    }
}
