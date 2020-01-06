﻿// <auto-generated />
using System;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Infrastructure;
using Microsoft.EntityFrameworkCore.Metadata;
using Microsoft.EntityFrameworkCore.Migrations;
using Microsoft.EntityFrameworkCore.Storage.ValueConversion;
using WebAPI3;

namespace WebAPI3.Migrations
{
    [DbContext(typeof(ApplicationDbContext))]
    [Migration("20200105121152_dp update2")]
    partial class dpupdate2
    {
        protected override void BuildTargetModel(ModelBuilder modelBuilder)
        {
#pragma warning disable 612, 618
            modelBuilder
                .HasAnnotation("ProductVersion", "3.1.0")
                .HasAnnotation("Relational:MaxIdentifierLength", 128)
                .HasAnnotation("SqlServer:ValueGenerationStrategy", SqlServerValueGenerationStrategy.IdentityColumn);

            modelBuilder.Entity("WebAPI3.Models.Activity", b =>
                {
                    b.Property<int>("ActivityId")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("int")
                        .HasAnnotation("SqlServer:ValueGenerationStrategy", SqlServerValueGenerationStrategy.IdentityColumn);

                    b.Property<int?>("ActivityColorId")
                        .HasColumnType("int");

                    b.Property<string>("ActivityName")
                        .IsRequired()
                        .HasColumnType("nvarchar(max)");

                    b.Property<int?>("ActivityStatusId")
                        .HasColumnType("int");

                    b.Property<int?>("ActivityTypeId")
                        .HasColumnType("int");

                    b.Property<int?>("UserId")
                        .HasColumnType("int");

                    b.HasKey("ActivityId");

                    b.HasIndex("ActivityColorId");

                    b.HasIndex("ActivityStatusId");

                    b.HasIndex("ActivityTypeId");

                    b.HasIndex("UserId");

                    b.ToTable("Activity");
                });

            modelBuilder.Entity("WebAPI3.Models.ActivityColor", b =>
                {
                    b.Property<int>("ActivityColorId")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("int")
                        .HasAnnotation("SqlServer:ValueGenerationStrategy", SqlServerValueGenerationStrategy.IdentityColumn);

                    b.Property<string>("ActivityColorName")
                        .IsRequired()
                        .HasColumnType("nvarchar(max)");

                    b.HasKey("ActivityColorId");

                    b.ToTable("ActivityColor");
                });

            modelBuilder.Entity("WebAPI3.Models.ActivityStatus", b =>
                {
                    b.Property<int>("ActivityStatusId")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("int")
                        .HasAnnotation("SqlServer:ValueGenerationStrategy", SqlServerValueGenerationStrategy.IdentityColumn);

                    b.Property<string>("ActivityStatusName")
                        .IsRequired()
                        .HasColumnType("nvarchar(max)");

                    b.HasKey("ActivityStatusId");

                    b.ToTable("ActivityStatus");
                });

            modelBuilder.Entity("WebAPI3.Models.ActivityTask", b =>
                {
                    b.Property<int>("ActivityTaskId")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("int")
                        .HasAnnotation("SqlServer:ValueGenerationStrategy", SqlServerValueGenerationStrategy.IdentityColumn);

                    b.Property<int?>("ActivityId")
                        .HasColumnType("int");

                    b.Property<string>("ActivityTaskName")
                        .IsRequired()
                        .HasColumnType("nvarchar(max)");

                    b.Property<string>("DonePercentage")
                        .HasColumnType("nvarchar(max)");

                    b.Property<int>("Duration")
                        .HasColumnType("int");

                    b.HasKey("ActivityTaskId");

                    b.HasIndex("ActivityId");

                    b.ToTable("ActivityTask");
                });

            modelBuilder.Entity("WebAPI3.Models.ActivityType", b =>
                {
                    b.Property<int>("ActivityTypeId")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("int")
                        .HasAnnotation("SqlServer:ValueGenerationStrategy", SqlServerValueGenerationStrategy.IdentityColumn);

                    b.Property<string>("ActivityTypeName")
                        .IsRequired()
                        .HasColumnType("nvarchar(max)");

                    b.HasKey("ActivityTypeId");

                    b.ToTable("ActivityType");
                });

            modelBuilder.Entity("WebAPI3.Models.Schedule", b =>
                {
                    b.Property<int>("ScheduleId")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("int")
                        .HasAnnotation("SqlServer:ValueGenerationStrategy", SqlServerValueGenerationStrategy.IdentityColumn);

                    b.Property<int?>("ActivityTaskId")
                        .HasColumnType("int");

                    b.Property<DateTime>("Date")
                        .HasColumnType("datetime2");

                    b.Property<bool>("Moveable")
                        .HasColumnType("bit");

                    b.Property<int>("TimeFrom")
                        .HasColumnType("int");

                    b.Property<int>("TimeTo")
                        .HasColumnType("int");

                    b.HasKey("ScheduleId");

                    b.HasIndex("ActivityTaskId");

                    b.ToTable("Schedule");
                });

            modelBuilder.Entity("WebAPI3.Models.User", b =>
                {
                    b.Property<int>("UserId")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("int")
                        .HasAnnotation("SqlServer:ValueGenerationStrategy", SqlServerValueGenerationStrategy.IdentityColumn);

                    b.Property<string>("Email")
                        .IsRequired()
                        .HasColumnType("nvarchar(max)");

                    b.Property<string>("FirstName")
                        .IsRequired()
                        .HasColumnType("nvarchar(max)");

                    b.Property<string>("LastName")
                        .IsRequired()
                        .HasColumnType("nvarchar(max)");

                    b.Property<byte[]>("PasswordHash")
                        .HasColumnType("varbinary(max)");

                    b.Property<byte[]>("PasswordSalt")
                        .HasColumnType("varbinary(max)");

                    b.HasKey("UserId");

                    b.ToTable("User");
                });

            modelBuilder.Entity("WebAPI3.Models.UserActivityType", b =>
                {
                    b.Property<int>("UserActivityTypeId")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("int")
                        .HasAnnotation("SqlServer:ValueGenerationStrategy", SqlServerValueGenerationStrategy.IdentityColumn);

                    b.Property<int?>("ActivityTypeId")
                        .HasColumnType("int");

                    b.Property<int>("TimeFrom")
                        .HasColumnType("int");

                    b.Property<int>("TimeTo")
                        .HasColumnType("int");

                    b.Property<int?>("UserId")
                        .HasColumnType("int");

                    b.HasKey("UserActivityTypeId");

                    b.HasIndex("ActivityTypeId");

                    b.HasIndex("UserId");

                    b.ToTable("UserActivityType");
                });

            modelBuilder.Entity("WebAPI3.Models.Activity", b =>
                {
                    b.HasOne("WebAPI3.Models.ActivityColor", "ActivityColor")
                        .WithMany("Activity")
                        .HasForeignKey("ActivityColorId");

                    b.HasOne("WebAPI3.Models.ActivityStatus", "ActivityStatus")
                        .WithMany("Activity")
                        .HasForeignKey("ActivityStatusId");

                    b.HasOne("WebAPI3.Models.ActivityType", null)
                        .WithMany("Activity")
                        .HasForeignKey("ActivityTypeId");

                    b.HasOne("WebAPI3.Models.User", "User")
                        .WithMany("Activity")
                        .HasForeignKey("UserId");
                });

            modelBuilder.Entity("WebAPI3.Models.ActivityTask", b =>
                {
                    b.HasOne("WebAPI3.Models.Activity", "Activity")
                        .WithMany("ActivityTask")
                        .HasForeignKey("ActivityId");
                });

            modelBuilder.Entity("WebAPI3.Models.Schedule", b =>
                {
                    b.HasOne("WebAPI3.Models.ActivityTask", "ActivityTask")
                        .WithMany("Schedule")
                        .HasForeignKey("ActivityTaskId");
                });

            modelBuilder.Entity("WebAPI3.Models.UserActivityType", b =>
                {
                    b.HasOne("WebAPI3.Models.ActivityType", "ActivityType")
                        .WithMany("UserActivityType")
                        .HasForeignKey("ActivityTypeId");

                    b.HasOne("WebAPI3.Models.User", "User")
                        .WithMany("UserActivityType")
                        .HasForeignKey("UserId");
                });
#pragma warning restore 612, 618
        }
    }
}
