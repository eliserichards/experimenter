# Generated by Django 3.0.7 on 2020-09-18 15:28

import django.db.models.deletion
from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ("experiments", "0110_experiment_is_high_population"),
    ]

    operations = [
        migrations.CreateModel(
            name="NimbusBucketNamespace",
            fields=[
                (
                    "id",
                    models.AutoField(
                        auto_created=True,
                        primary_key=True,
                        serialize=False,
                        verbose_name="ID",
                    ),
                ),
                ("name", models.CharField(max_length=255)),
                ("instance", models.PositiveIntegerField(default=1)),
                ("total", models.PositiveIntegerField(default=10000)),
                (
                    "randomization_unit",
                    models.CharField(default="normandy_id", max_length=255),
                ),
            ],
            options={
                "verbose_name": "Bucket Namespace",
                "verbose_name_plural": "Bucket Namespaces",
                "ordering": ("name", "instance"),
                "unique_together": {("name", "instance")},
            },
        ),
        migrations.CreateModel(
            name="NimbusBucketRange",
            fields=[
                (
                    "id",
                    models.AutoField(
                        auto_created=True,
                        primary_key=True,
                        serialize=False,
                        verbose_name="ID",
                    ),
                ),
                ("start", models.PositiveIntegerField()),
                ("count", models.PositiveIntegerField()),
                (
                    "experiment",
                    models.OneToOneField(
                        on_delete=django.db.models.deletion.CASCADE,
                        related_name="bucket_ranges",
                        to="experiments.NimbusExperiment",
                    ),
                ),
                (
                    "namespace",
                    models.ForeignKey(
                        on_delete=django.db.models.deletion.CASCADE,
                        related_name="bucket_ranges",
                        to="experiments.NimbusBucketNamespace",
                    ),
                ),
            ],
            options={
                "verbose_name": "Bucket Range",
                "verbose_name_plural": "Bucket Ranges",
            },
        ),
    ]
